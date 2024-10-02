import request from "supertest";
import express from "express";
import routes from "../../../src/routes";
import { AuthMiddleware } from "../../../src/middlewares/Auth/Auth";

jest.mock("../../../src/middlewares/Auth/Auth");

const app = express();
app.use(express.json());
app.use(AuthMiddleware as any);
app.use(routes);

describe("Test Routes", () => {
  beforeEach(() => {
    (AuthMiddleware as jest.Mock).mockImplementation((req, res, next) => {
      req.user = { id: "123", name: "Test User" };
      next();
    });
  });

  test("should respond to GET /users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
