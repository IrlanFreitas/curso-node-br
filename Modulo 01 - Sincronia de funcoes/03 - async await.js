/*
 * PROMISES - ASYNC/AWAIT
 * Facilita a visualização do fluxo de funções
 * Não altera a performance de sua aplicação
 * Veio da galera do C#
 * Usar apenas quando necessitar tratar a resposta da chamada
 */

// * Importamos um módulo interno do node.js
const util = require("util");

// ! Se não tiver no padrão de callback, não funciona
const obterEnderenoAsync = util.promisify(obterEnderecoCallback);

function obterUsuario() {
  // ! Quando der algum problea -> reject(erro)
  // * Quando sucesso -> resolve(dados)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: "Alladin",
        dataNascimento: new Date()
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({ telefone: "99869582", ddd: 71 });
    }, 2000);
  });
}

function obterEnderecoPromise(idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        rua: "Coronel Fabriciano",
        numero: 11,
        complemento: "a"
      });
    }, 2000);
  });
}

function obterEnderecoCallback(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Coronel Fabriciano",
      numero: 11,
      complemento: "a"
    });
  }, 2000);
}

main();

// ! 1° passo adicionar a palavra async -> automaticamente ele retornará uma Promise
async function main() {
  try {
      // * Capturando o tempo de execução
    console.time("medida-promise");
    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoPromise(usuario.id);

    const resultado = await Promise.all([ obterTelefone(usuario.id), obterEnderecoPromise(usuario.id)])

    console.log({ usuario, telefone: resultado[0], endereco: resultado[1] });

    console.timeEnd("medida-promise");
  } catch (error) {
    console.error("DEU RUIM: ", error);
  }
}
