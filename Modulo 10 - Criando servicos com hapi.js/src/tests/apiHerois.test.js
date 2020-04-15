const assert = require("assert");
const api = require("./../api");

let app = {};

const MOCK_DEFAULT_CADASTRAR = {
  nome: "Static Shock",
  poder: "To be black",
};

const MOCK_DEFAULT_ATUALIZAR = {
  nome: "Hawkeye",
  poder: "Anel mágico",
};

let MOCK_ID_UPLETE = null;

describe.only("Suite de teste da API Herois", function () {
  this.beforeAll(async () => {
    app = await api;

    const result = await app.inject({
      method: "POST",
      url: "/herois",
      payload: MOCK_DEFAULT_ATUALIZAR,
    });

    MOCK_ID_UPLETE = JSON.parse(result.payload)._id;
  });

  it("Listar GET /herois", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/herois",
    });
    const dados = JSON.parse(result.payload);

    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);

    assert.ok(Array.isArray(dados));
  });

  it("Listar GET /herois - Deve retornar somente 10 registros", async () => {
    const LIMITE = 10;

    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${LIMITE}`,
    });

    const dados = JSON.parse(result.payload);

    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === LIMITE);
  });

  it("Listar GET /herois - Deve invalidar o tipo limit", async () => {
    const LIMITE = "AEE";

    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${LIMITE}`,
    });

    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 400);
  });

  it("Listar GET /herois - Deve filtrar um item", async () => {
    const NOME = "Homem Aranha-1585785284666";

    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=10&nome=${NOME}`,
    });
    const dados = JSON.parse(result.payload);

    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(dados[0].nome === NOME);
  });

  it("Cadastrar POST - /herois", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/herois",
      payload: MOCK_DEFAULT_CADASTRAR,
    });

    const { message, _id } = JSON.parse(result.payload);

    assert.ok(result.statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Heroi cadastrado com sucesso!");
  });

  it("Atualizar PATCH - /herois/id", async () => {
    const expected = { poder: "Ser foda" };

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/${MOCK_ID_UPLETE}`,
      payload: expected,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Heroi atualizado com sucesso");
  });

  it("Deletar DELETE - /herois/id ", async () => {
    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${MOCK_ID_UPLETE}`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Heroi deletado com sucesso");
  });

  it("Deletar DELETE - /herois/id - Não deve remover", async () => {
    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${MOCK_ID_UPLETE}`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 412);
    assert.deepEqual(dados.message, "Id não encontrado");
  });

  it("Atualizar PATCH - /heroi/id - Não deve atualizar com ID incorreto", async () => {

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/ID_INVALIDO`,
      payload: { poder: "Ser foda" },
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    const expected = {
      statusCode: 500,
      error: "Internal Server Error",
      message: "An internal server error occurred",
    };
    
    assert.ok(statusCode === 500);
    assert.deepEqual(dados, expected);
  });
});
