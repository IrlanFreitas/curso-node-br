const Routes = require("./base/routes");
const Joi = require("joi");
const Boom = require("boom")
const failAction = (request, headers, erro) => {
  throw erro;
};
class HeroRoutes extends Routes {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: "/herois",
      method: "GET",
      config: {
        validate: {
          //payload == body
          //header || head
          //params -> na url :id
          //query -> ?skip=10&limit=100
          failAction,
          query: {
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            nome: Joi.string().min(3).max(100),
          },
        },
      },
      handler: (request, headers) => {
        try {
          const { skip, limit, nome } = request.query;
          const query = nome ? { nome: { $regex: `.*${nome}*.` } } : {};

          return this.db.read(query, skip, limit);
        } catch (error) {
          console.log("DEU RUIM: ", error);
          return Boom.internal();
        }
      },
    };
  }

  create() {
    return {
      path: "/herois",
      method: "POST",
      config: {
        validate: {
          failAction,
          payload: {
            nome: Joi.string().required().min(3).max(100),
            poder: Joi.string().required().min(3).max(100),
          },
        },
      },
      handler: async (request, headers) => {
        try {
          const { payload } = request;

          const result = await this.db.create(payload);

          return { _id: result.id, message: "Heroi cadastrado com sucesso!" };
        } catch (error) {
          console.log("DEU RUIM: ", error);
          return Boom.internal();
        }
      },
    };
  }

  update() {
    return {
      path: "/herois/{id}",
      method: "PATCH",
      config: {
        validate: {
          failAction,
          params: {
            id: Joi.string().required(),
          },
          payload: {
            nome: Joi.string().min(3).max(100),
            poder: Joi.string().min(3).max(100),
          },
        },
      },
      handler: async (request, headers) => {
        try {
          const { id } = request.params;
          const { payload } = request;

          const dados = JSON.parse(JSON.stringify(payload));

          const result = await this.db.update(id, dados);

          if (result.nModified !== 1) {
            return Boom.preconditionFailed("Id não encontrado")
          }

          return { message: "Heroi atualizado com sucesso" };
        } catch (error) {
          console.log("DEU RUIM: ", error);
          return Boom.internal();
        }
      },
    };
  }

  delete() {
    return {
      path: "/herois/{id}",
      method: "DELETE",
      config: {
        validate: {
          failAction,
          params: {
            id: Joi.string().required(),
          },
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params
          const result = await this.db.delete(id)

          if (result.deletedCount !== 1) {
            return Boom.preconditionFailed("Id não encontrado")
          }
          
          return { message: "Heroi deletado com sucesso" }

        } catch (error) {
          console.log("DEU RUIM: ", error);
          return Boom.internal();
        }
      },
    };
  }
}

module.exports = HeroRoutes;
