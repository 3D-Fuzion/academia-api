const request = require("supertest");

describe("Cadastro de Usuarios", () => {
  it("Sintaxe correta | CADASTRO PADRAO |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      email: "exemploteste@email.com",
      password: "123123123",
      cpf: "15918390769",
      academycode: "88888888",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(201);
  });
  it("Sintaxe correta | CADASTRO DUPLICADO |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      email: "exemploteste@email.com",
      password: "123123123",
      cpf: "15918390769",
      academycode: "88888888",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(400);
  });

  it("Sintaxe incorreta | SENHA PEQUENA |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      email: "exemploteste@email.com",
      password: "123123",
      cpf: "15918390769",
      academycode: "88888888",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(400);
  });
  it("Sintaxe incorreta | CPF FALTANDO NUMERO |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      email: "exemploteste@email.com",
      password: "123123",
      cpf: "1591839076",
      academycode: "88888888",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(400);
  });
  it("Sintaxe incorreta | CPF CONTENDO LETRA |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      email: "exemploteste@email.com",
      password: "123123",
      cpf: "1591839a766",
      academycode: "88888888",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(400);
  });
  it("Sintaxe incorreta | ACADEMYCODE NAO TEM 8 NUMEROS |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      email: "exemploteste@email.com",
      password: "123123",
      cpf: "1591839076",
      academycode: "8888888",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(400);
  });

  it("Sintaxe incorreta | ACADEMYCODE ACADEMIA NAO ENCONTRADA |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      email: "exemploteste@email.com",
      password: "123123",
      cpf: "1591839076",
      academycode: "77777777",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(400);
  });
  it("Sintaxe incorreta | FALTANDO NOME |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      email: "exemploteste@email.com",
      password: "123123",
      cpf: "1591839076",
      academycode: "77777777",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(400);
  });

  it("Sintaxe incorreta | FALTANDO EMAIL |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      password: "123123",
      cpf: "1591839076",
      academycode: "77777777",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(400);
  });
  it("Sintaxe incorreta | FALTANDO SENHA |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      email: "exemploteste@email.com",
      cpf: "1591839076",
      academycode: "77777777",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(400);
  });
  it("Sintaxe incorreta | FALTANDO CPF |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      email: "exemploteste@email.com",
      password: "123123",
      academycode: "77777777",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(400);
  });

  it("Sintaxe incorreta | FALTANDO CODIGO ACADEMIA |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      email: "exemploteste@email.com",
      password: "123123",
      cpf: "1591839076",
      birthdate: "2003-07-23",
    });
    expect(res.statusCode).toEqual(400);
  });

  it("Sintaxe incorreta | FALTANDO DATA DE NASCIMENTO |", async () => {
    const res = await request("http://localhost:3333").post("/user").send({
      name: "TESTCadastro",
      email: "exemploteste@email.com",
      password: "123123",
      cpf: "1591839076",
      academycode: "77777777",
    });
    expect(res.statusCode).toEqual(400);
  });
});
