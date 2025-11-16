import request from "supertest";
import app from "../src/app";

let token = "";
let sweetId = "";

beforeEach(async () => {
  const reg = await request(app).post("/api/auth/register").send({
    name: "UserA",
    email: "user@example.com",
    password: "123456",
  });
  const user = await request(app).post("/api/auth/login").send({
    email: "user@example.com",
    password: "123456",
  });
  token = user.body.token;

  const sweet = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Jalebi",
      category: "Indian",
      price: 20,
      quantity: 10,
    });

  sweetId = sweet.body._id;
});

describe("INVENTORY OPERATIONS", () => {
  it("should purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();

  });

  it("should prevent purchase when quantity is zero", async () => {
    await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    // reduce quantity manually
    for (let i = 0; i < 10; i++) {
      await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set("Authorization", `Bearer ${token}`);
    }

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
  });
});
