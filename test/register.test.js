const request = require("supertest"); 

describe("Testando Cadastro", () => { 
  it("Sei la ", async () => { 
    const res = await request('http://localhost:3333').get("/manager/solicitation")
    expect(res.statusCode).toEqual(200)
  })
});

 
