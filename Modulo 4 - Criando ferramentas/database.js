const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.NOME_ARQUIVO = "herois.json";
  }

  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, "utf8");
    return JSON.parse(arquivo.toString());
  }

  async escreverArquivo(dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
    return true;
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivo();
    console.log("Heroi: ", heroi);

    const id = heroi.id && heroi.id <= 2 ? heroi.id : Date.now();
    /**
     * {
     *  nome: Flash,
     *  poder: Velocidade
     * }
     */
    const heroiComId = {
      id,
      ...heroi
    };

    //* Pegando os dados anteriores e adicionando tudo novamente ao arquivo
    const dadosFinal = [...dados, heroiComId];

    const resultado = await this.escreverArquivo(dadosFinal);

    return resultado;
  }

  async listar(id) {
    const dados = await this.obterDadosArquivo();
    //* Caso não tiver id, o retorno será a lista completa
    const dadosFiltrados = dados.filter(dado => (id ? dado.id === id : true));
    return dadosFiltrados;
  }

  async remover(id) {
    if (!id) {
      return await this.escreverArquivo([]);
    }
    const dados = await this.obterDadosArquivo();
    const indice = dados.findIndex(item => item.id === parseInt(id));
    if (indice === -1) {
      throw Error("O usuário informado não existe");
    }
    dados.splice(indice, 1);
    return await this.escreverArquivo(dados);
  }

  async atualizar(id, modificacoes) {
    const dados = await this.obterDadosArquivo();
    const indice = dados.findIndex(item => item.id === parseInt(id));
    if (indice === -1) {
      throw Error("O herói informado não existe");
    }
    const atual = dados[indice];

    //* Substituindo o que tem no atual, pelo novo com o destructing
    const objetoAtualizar = {
      ...atual,
      ...modificacoes
    };
    dados.splice(indice, 1);

    return await this.escreverArquivo([...dados, objetoAtualizar]);
  }
}

module.exports = new Database();
