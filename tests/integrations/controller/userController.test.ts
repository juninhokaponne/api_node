import { Request, Response } from "express";
import { UserController } from "../../../src/controllers/user/UserController";
import { UserRepository } from "../../../src/repositories/user/UserRepository";
import { UserService } from "../../../src/services/user/UserService";
import { mockRequest, mockResponse } from "jest-mock-req-res";

describe("Test UserController", () => {
  test("should create an instance of UserController", () => {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);
    expect(controller).toBeDefined();
  });

  test("should return an array of users", async () => {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);
    const req = mockRequest();
    const res = mockResponse();
    await controller.getUsers(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});
