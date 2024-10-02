import { Request, Response } from "express";
import { UserController } from "../../../src/controllers/user/UserController";
import { UserService } from "../../../src/services/user/UserService";
import { UserRepository } from "../../../src/repositories/user/UserRepository";

jest.mock("../../../src/services/user/UserService");

describe("UserController Unit Tests", () => {
  let userController: UserController;
  let userService: jest.Mocked<UserService>;
  let userRepository: jest.Mocked<UserRepository>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: jest.Mock;
  let status: jest.Mock;

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;

    userService = new UserService(userRepository) as jest.Mocked<UserService>;

    userController = new UserController(userService);

    json = jest.fn();
    status = jest.fn(() => ({ json })) as any;

    req = {};
    res = { status, json };
  });

  test("should create a user and return 201", async () => {
    req.body = { name: "New User" };

    userService.createUser.mockResolvedValue({
      user: {
        id: 2,
        name: "New User",
        email: "newuser@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      token: "some-token",
    });

    await userController.createUser(req as Request, res as Response);

    expect(userService.createUser).toHaveBeenCalledWith({ name: "New User" });
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({
      user: {
        id: 2,
        name: "New User",
        email: "newuser@example.com",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      token: "some-token",
    });
  });

  test("should return 404 when user to update is not found", async () => {
    req.params = { id: "999" };
    req.body = {};

    userService.updateUser.mockResolvedValue(null as any);

    await userController.updateUser(req as Request, res as Response);

    expect(userService.updateUser).toHaveBeenCalledWith("999", req.body);
    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ message: "User not found" });
  });
});
