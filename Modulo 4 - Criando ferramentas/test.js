const { deepEqual, ok } = require("assert");
const database = require("./database");
const DEFAULT_ITEM_CADASTRAR = { id: 1, nome: "Flash", poder: "Speed" };
const DEFAULT_ITEM_ATUALIZAR = {
  id: 2,
  nome: "Lanterna Verde",
  poder: "Energia do Anel"
};

describe("Suite de manipulação de Heróis", () => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  });

  it("Deve pesquisar um herói usando arquivos", async () => {
    //* Valor esperado
    const expected = DEFAULT_ITEM_CADASTRAR;

    //* Processamento
    //! Pegando a primeira posição com destructor
    const [resultado] = await database.listar(expected.id);

    //* Saída
    deepEqual(resultado, expected);
  });

  it("Deve cadastrar um herói, usando arquivos", async () => {
    //* Valor esperado
    const expected = DEFAULT_ITEM_CADASTRAR;

    //* Processamento
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [atual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);

    //* Saída
    deepEqual(atual, expected);
  });

  it("Deve remover um herói por id, usando arquivos", async () => {
    const expected = true;

    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);

    deepEqual(resultado, expected);
  });

  it("Deve atualizar um herói pelo id", async () => {
    //* Tem que manter o id
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: "Batman",
      poder: "Dinheiro"
    };

    const novoDado = {
      nome: "Batman",
      poder: "Dinheiro"
    };

    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);

    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

    deepEqual(resultado, expected);
  });
});
