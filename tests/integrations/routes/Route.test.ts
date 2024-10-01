import request from "supertest";
import express from "express";
import routes from "../../../src/routes";

const app = express();
app.use(express.json());
app.use(routes);

describe("Test Routes", () => {
  test("should create an instance of routes", () => {
    expect(app).toBeDefined();
    expect(routes).toBeDefined();
  });

  test("should return 404 for invalid route", async () => {
    const response = await request(app).get("/invalid-route");
    expect(response.status).toBe(404);
  });

  test("should respond to GET /users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
