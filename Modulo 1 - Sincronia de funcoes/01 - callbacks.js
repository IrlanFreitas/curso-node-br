/*  Objetivos
    0 - Obter um usuário
    1 - Obter numero de telefone de um usuário a partir do seu Id
    2 - Obter o endereco do usuário pelo Id
*/

function obterUsuario(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      nome: "Alladin",
      dataNascimento: new Date()
    });
  }, 1000);
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, { telefone: "99869582", ddd: 71 });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Coronel Fabriciano",
      numero: 11,
      complemento: "a"
    });
  }, 2000);
}

function resolverUsuario(erro, usuario) {
  console.log("usuario: ", usuario);
}

obterUsuario((erro, usuario) => {
  // null || "" || 0 === false
  if (erro) {
    console.error("DEU RUIM em USUARIO: ", erro);
    return;
  }

  console.log("Usuario: ", usuario);

  obterTelefone(usuario.id, (erro1, telefone) => {
    if (erro1) {
      console.error("DEU RUIM em TELEFONE: ", erro1);
      return;
    }

    console.log("Telefone: ", telefone);

    obterEndereco(usuario.id, (erro2, endereco) => {
      if (erro2) {
        console.error("DEU RUIM em ENDEREÇO: ", erro2);
        return;
      }

      console.log("Endereço: ", endereco);
    });
  });
});
// const telefone = obterTelefone(usuario.id);
