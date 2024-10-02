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

  test("should return an user", async () => {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);
    const req = mockRequest({ params: { id: "1" } });
    const res = mockResponse();
    await controller.getUsers(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

  test("should create an user", async () => {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);
    const req = mockRequest({ body: { name: "Test User" } });
    const res = mockResponse();
    await controller.createUser(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

  test("should update an user", async () => {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);

    const req = mockRequest({
      params: { id: "1" },
      body: { name: "Test User" },
    });
    const res = mockResponse();
    await controller.updateUser(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

  test("should delete an user", async () => {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);
    const req = mockRequest({ params: { id: "1" } });
    const res = mockResponse();
    await controller.deleteUser(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

  test("should return an 404 status if id was not provided", async () => {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);

    const req = mockRequest({ params: {} });
    const res = mockResponse();
    await controller.getUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
