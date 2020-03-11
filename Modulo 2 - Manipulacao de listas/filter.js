//! Usando Destructing para obter somente o necessário
const { obterPessoas } = require("./service");

Array.prototype.meuFilter = function(callback) {
  const novoArrayFiltrado = [];

  for (let index = 0; index < this.length; index++) {
    if (callback(this[index], index, this)) {
      novoArrayFiltrado.push(this[index]);
    }
  }

  return novoArrayFiltrado;
};

async function main() {
  try {
    //! Usando Destructing
    const { results } = await obterPessoas("a");

    // const namesStartsWithL = results.filter(pessoa => pessoa.name.startsWith("L"))
    const familyLars = results
      .meuFilter(pessoa => pessoa.name.toLowerCase().endsWith("lars"))
      .map(pessoa => pessoa.name);

    console.table(familyLars);
  } catch (error) {
    console.error("DEU RUIM: ", error);
  }
}

main();
