const commander = require("commander");
const Database = require("./database");
const Heroi = require("./heroi");

async function main() {
  //! Transforma as funções em comandos de linha de comando
  commander
    .version("v1")
    .option("-n, --nome [value]", "Nome do herói")
    .option("-p, --poder [value]", "Poder do herói")
    .option("-i, --id [value]", "Id do herói")

    .option("-c --cadastrar", "Cadastrar um herói")
    .option("-a --atualizar [value]", "Atualizar um herói")
    .option("-l --listar", "Listar um ou todos os heróis")
    .option("-r --remover", "Remover um herói pelo id")
    .parse(process.argv);

  const heroi = new Heroi(commander);

  try {
    if (commander.cadastrar) {
      delete heroi.id;
      const resultado = await Database.cadastrar(heroi);
      if (!resultado) {
        console.error("Herói não foi cadastrado");
        return;
      }

      console.log("Herói cadastrado com sucesso");
    }
    if (commander.atualizar) {
      const idParaAtualizar = parseInt(commander.atualizar);
      //* Remover todas as chaves com undefined ou null
      const dado = JSON.stringify(heroi)
      //* Remove as chaves desnecessarias
      const heroiAtualizar = JSON.parse(dado)

      const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);
      if (!resultado) {
        console.error("Não foi possível atualizar o herói");
        return;
      }

      console.log("Herói atualizado com sucesso");

      return;
    }
    if (commander.listar) {
      const resultado = await Database.listar();
      console.log(resultado);

      return;
    }
    if (commander.remover) {
      const resultado = await Database.remover(heroi.id);
      if (!resultado) {
        console.log("Não foi possível remover o herói");
        return;
      }
      console.log("Herói removido com sucesso");

      return;
    }
  } catch (error) {
    console.error("Deu ruim: ", error);
  }
}

main();
