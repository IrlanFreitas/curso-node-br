const { obterPessoas } = require("./service");

Array.prototype.meuReduce = function(callback, valorInicial) {
  let acumulador = typeof valorInicial !== undefined ? valorInicial : this[0];
  for (let index = 0; index < this.length; index++) {
    acumulador = callback(acumulador, this[index], index, this);
  }

  return acumulador;
};

async function main() {
  try {
    const { results } = await obterPessoas("a");

    // const pesos = results
    //   .map(pessoa => parseInt(pessoa.height))
    //   .reduce((acumulador, atual) => acumulador + atual);

    //* Feito com meu Reduce
    const pesos = results
      .map(pessoa => parseInt(pessoa.height))
      .meuReduce((acumulador, atual) => acumulador + atual, 0);

    // console.log(`Soma total dos pesos: ${pesos}`);

    const minhaLista = [['Erick', 'Wendel'], ['NodeBr', 'Nerdzao']]

    const total = minhaLista.meuReduce( (anterior, proximo) => anterior.concat(proximo), [] ).join(' ')

    console.log(total);
    
  } catch (error) {
    console.error("DEU RUIM: ", error);
  }
}

main();
