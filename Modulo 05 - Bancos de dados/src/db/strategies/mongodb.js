const ICrud = require('./interfaces/interfaceCrud')

class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log(`O item:${JSON.stringify(item)} foi salvo no mongoDb`);
  }
}

module.exports = MongoDB
