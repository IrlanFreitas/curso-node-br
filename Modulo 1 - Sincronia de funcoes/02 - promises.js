/*
 * CICLO DE VIDA - PROMISE
 * Pending - Estado inicial, ainda não terminou ou ainda não foi rejeitado
 * Fullfiled - Quando executou todas as operações com sucesso
 * Rejected - Quando a operação falhou (Pego com try/catch)
 */

/*
 * Objetivos
 * 0 - Obter um usuário
 * 1 - Obter numero de telefone de um usuário a partir do seu Id
 * 2 - Obter o endereco do usuário pelo Id
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

const usuarioPromise = obterUsuario();

// * Para manipular o sucesso usamos o .then()
// ! Para manipular o erro, .catch()

// Conceito de Pipe
// Usuario -> Telefone ->
usuarioPromise
  // * O retorno da promise é uma nova promise
  .then(usuario => {
    return obterTelefone(usuario.id).then(telefone => {
      // ! Resolvendo a promise para não perder os dados
      return {
        usuario,
        telefone
      };
    });
  })
  .then(dadosAnteriores => {
    return obterEnderenoAsync(dadosAnteriores.usuario.id).then(endereco => {
      // ! Desestruturando o objeto para organizar melhor
      return {
        ...dadosAnteriores,
        endereco
      };
    });
  })
  .then(resultado => {
    console.log("Resultado: ", resultado);
  })
  .catch(erro => {
    console.error("DEU RUIM: ", erro);
  });
