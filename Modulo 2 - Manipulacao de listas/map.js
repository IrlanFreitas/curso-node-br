const service = require("./service");

// ! Criando seu próprio map
Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for(let i = 0; i <= this.length -1; i++) {
        const resultado = callback(this[i], i)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado
}

async function main() {
  try {
    const resultado = await service.obterPessoas("a");
    // const names = []
    // resultado.results.forEach(dado => {
    //   names.push(dado.name);
    // });
    // resultado.results.map(dado => {
    //     names.push(dado.name);
    // });
    // const names = resultado.results.map(dado => dado.name);
    const names = resultado.results.meuMap(dado => dado.name);

    console.table(names);
  } catch (error) {
    console.error("DEU RUIM ", error);
  }
}

main();
