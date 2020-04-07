const ICrud = require('./interfaces/interfaceCrud')

class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log(`O item:${JSON.stringify(item)} foi salvo no postgres`);
  }
}

module.exports = Postgres;
