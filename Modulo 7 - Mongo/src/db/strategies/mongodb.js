const ICrud = require("./interfaces/interfaceCrud");
const Mongoose = require("mongoose");

const STATUS = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Disconectando"
};

class MongoDB extends ICrud {
  constructor() {
    super();
    this._connection = null;
    this._herois = null;
    this._driver = null;
  }

  defineModel() {
    this._herois = Mongoose.model(
      "herois",
      new Mongoose.Schema({
        nome: {
          type: String,
          require: true
        },
        poder: {
          type: String,
          require: true
        },
        insertedAt: {
          type: Date,
          default: new Date()
        }
      })
    );
  }

  connect() {
    Mongoose.connect(
      "mongodb://irlanfreitas:irlanfreitas@localhost:27017/herois",
      { useNewUrlParser: true },
      error => {
        if (!error) return;
        console.log("Falha na conexao! ", error);
      }
    );

    this._connection = Mongoose.connection;
    this._connection.once("open", () => {
      console.log("Database rodando");
    });
    this.defineModel();
  }

  async disconnect() {
    await this._connection.close(error => {
      console.log("Erro ao fechar a conexão do mongo: ", error);
    });
    console.log("Disconectado com sucesso.");
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState];

    if (state === "Conectado") return state;
    if (state !== "Conectando") return state;

    await new Promise(resolve => setTimeout(resolve, 2000));

    return state;
  }

  create(item) {
    return this._herois.create(item);
  }

  read(query, skip = 0, limit = 10) {
    return this._herois.find(query).skip(skip).limit(limit)
  }

  update(id, item) {
    return this._herois.updateOne({_id: id}, {$set: {...item}})
  }

  delete(id) {
    return this._herois.deleteOne({_id: id})
  }
}

module.exports = MongoDB;
