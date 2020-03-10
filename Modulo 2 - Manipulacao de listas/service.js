const axios = require("axios");
const baseUrlPeople = "https://swapi.co/api/people";

async function obterPessoas(nome) {
  const url = `${baseUrlPeople}/?search=${nome}&format=json`;

  const response = await axios.get(url);
  return response.data;
}

module.exports = {
  obterPessoas
};
