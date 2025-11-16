import request from "supertest";
import app from "../src/app";

let adminToken = "";
let userToken = "";
let sweetId = "";

beforeAll(async () => {
  const adminRegister = await request(app)
    .post("/api/auth/register-admin")
    .send({
      name: "Admin",
      email: "admin@test.com",
      password: "123456",
      secret: "Tajinder is a great dev",
    });
    const admin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@test.com",
      password: "123456",
    });
  adminToken = admin.body.token;

  const user = await request(app)
    .post("/api/auth/register")
    .send({
      name: "User",
      email: "user@test.com",
      password: "123456",
    });

  userToken = user.body.token;

  const sweet = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Kaju Katli",
      category: "Indian",
      price: 100,
      quantity: 25,
    });


  sweetId = sweet.body._id;
});

describe("ADMIN OPERATIONS", () => {
  it("should allow admin to delete sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  it("should prevent normal user from deleting sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(401);
  });
});
