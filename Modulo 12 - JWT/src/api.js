//* npm i hapi
//* npm i vision inert hapi-swagger
//* npm i hapi-auth-jwt2
//* npm i bcrypt

const Hapi = require("@hapi/hapi");
const Context = require("./db/strategies/base/contextStrategy");
const MongoDb = require("./db/strategies/mongodb/mongodb");
const Postgres = require("./db/strategies/postgres/postgres");
const HeroiSchema = require("./db/strategies/mongodb/schemas/heroisSchema");
const UsuarioSchema = require("./db/strategies/postgres/schemas/usuarioSchema");

const HeroRoute = require("./routes/heroRoutes");
const AuthRoute = require("./routes/authRoutes");

const HapiSwagger = require("hapi-swagger");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");

const HapiJwt = require("hapi-auth-jwt2");
const JWT_SECRET = "MEU_SEGREDO_123";

const app = new Hapi.Server({
  port: 5000,
});

const mapRoutes = (instance, methods) => {
  return methods.map((method) => instance[method]());
};

const main = async () => {
  const connectionPostgres = await Postgres.connect();
  const model = await Postgres.defineModel(
    connectionPostgres,
    UsuarioSchema
  );
  const contextPostgres = new Context(
    new Postgres(connectionPostgres, model)
  );

  const connectionMongoDb = MongoDb.connect();
  const contextMongoDb = new Context(
    new MongoDb(connectionMongoDb, HeroiSchema)
  );

  const swaggerOptions = {
    info: {
      title: "API Herois - #CursoNodeBR",
      version: "v1.0",
    },
  };

  await app.register([
    HapiJwt,
    Vision,
    Inert,
    { plugin: HapiSwagger, options: swaggerOptions },
  ]);

  app.auth.strategy("jwt", "jwt", {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // }
    validate: async (dado, request) => {
      //Verificar no banco se o usuário continua ativo
      //Verificar no banco se o usuário continua pagando

      const [result] = await contextPostgres.read({
        username: dado.username,
      });

      if (!result)
        return {
          isValid: false,
        };

      return {
        isValid: true,
      };
    },
  });

  app.auth.default("jwt");

  app.route([
    ...mapRoutes(new HeroRoute(contextMongoDb), HeroRoute.methods()),
    ...mapRoutes(
      new AuthRoute(JWT_SECRET, contextPostgres),
      AuthRoute.methods()
    ),
  ]);

  await app.start();
  console.log("Servidor rodando na porta: ", app.info.port);

  return app;
};

module.exports = main();
