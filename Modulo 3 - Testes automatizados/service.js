const { get } = require("axios");

const url = "https://swapi.co/api/people";

const obterPessoas = async nome => {
  try {
    const resultado = await get(`${url}/?search=${nome}&format=json`);
    // console.log(JSON.stringify(resultado.data));
    
    //* Mapeando o resultado passando somente a funcao
    return resultado.data.results.map(mapearPessoa);

  } catch (error) {
    console.error("DEU RUIM: ", error);
  }
};

const mapearPessoa = item => {
  return {
    nome: item.name,
    peso: item.height
  };
};

module.exports = {
  obterPessoas,
  mapearPessoa
};
