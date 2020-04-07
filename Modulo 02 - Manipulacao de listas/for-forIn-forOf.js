const service = require("./service");

async function main() {
  try {
    const result = await service.obterPessoas("a");
    const [namesFor, namesForIn, namesForOf, namesForEach] = [[], [], [], []];
    console.time("for");
    for (let index = 0; index < result.results.length; index++) {
      const pessoa = result.results[index];
      namesFor.push(pessoa.name);
    }
    console.timeEnd("for");
    
    console.time("forIn");
    for (const i in result.results) {
        const pessoa = result.results[i];
        namesForIn.push(pessoa.name);
    }
    console.timeEnd("forIn");

    console.time("forOf");
    for (pessoa of result.results) {
        namesForOf.push(pessoa.name);
    }
    console.timeEnd("forOf");

    console.time("forEach");
    result.results.forEach(dado => {
      namesForEach.push(dado.name);
    });
    console.timeEnd("forEach");

    // console.table(namesFor);
    // console.table(namesForIn);
    // console.table(namesForOf);
    // console.table(namesForEach);
  } catch (error) {
    console.error("Error interno: ", error);
  }
}

main();
