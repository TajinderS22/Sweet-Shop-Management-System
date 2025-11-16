import request from "supertest";
import app from "../src/app";

describe("AUTH API", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "John",
      email: "john@example.com",
      password: "123456",
    });

    expect(res.status).toBe(201);
  });

  it("should prevent duplicate email", async () => {
    await request(app).post("/api/auth/register").send({
      name: "John",
      email: "john@example.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "john@example.com",
      password: "123456",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Email already registered/i);
  });

  it("should login successfully", async () => {
    await request(app).post("/api/auth/register").send({
      name: "John",
      email: "john@example.com",
      password: "123456",
    });

    const login = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "123456",
    });

    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });

  it("should reject invalid password", async () => {
    await request(app).post("/api/auth/register").send({
      name: "John",
      email: "john@example.com",
      password: "123456",
    });

    const login = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "wrongpass",
    });

    expect(login.status).toBe(401);
  });
});
