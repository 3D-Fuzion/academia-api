const request = require("supertest");

describe("Cadastro de Usuarios", () => {
  it("Sintaxe correta", async () => {
    const res = await request('http://localhost:3333')
      .post("/user")
      .send
      ({
        name: "TESTCadastro",
        email: "exemploteste@email.com",
        password: "123123123",
        cpf: "15918390769",
        academycode: "88888888",
        birthdate: "2003-07-23"
      });
    expect(res.statusCode).toEqual(200)
  })
});


