import request from "supertest";
import app from "../src/app";

let token = "";

beforeEach(async () => {
  const regUser = await request(app).post("/api/auth/register-admin").send({
    name: "Admin",
    email: "admin@example.com",
    password: "123456",
    secret:"Tajinder is a great dev"
  });
  const res = await request(app).post("/api/auth/login").send({
    email: "admin@example.com",
    password: "123456",
  });

  token = res.body.token;
});

describe("SWEETS API", () => {
  it("should create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 50,
        quantity: 20,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Ladoo");
  });

  it("should get all sweets", async () => {
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Barfi",
        category: "Indian",
        price: 30,
        quantity: 10,
      });

    const res = await request(app).get("/api/sweets").set("Authorization", `Bearer ${token}`);

      await new Promise(resolve => setTimeout(resolve, 50));
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("should search sweets", async () => {
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gulab Jamun",
        category: "Indian",
        price: 40,
        quantity: 15,
      });

    const res = await request(app).get(
      "/api/sweets/search?name=gulab"
    ).set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe("Gulab Jamun");
  });
});
