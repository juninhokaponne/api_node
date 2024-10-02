import { ErrorHandlerMiddleware } from "../../../src/middlewares/Error/ErrorHandler";
import { Request, Response, NextFunction } from "express";

test("should handle generic error", () => {
  const err = new Error("Something went wrong");
  const req = {} as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  ErrorHandlerMiddleware(err, req, res, next);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({
    status: "error",
    statusCode: 500,
    message: "Something went wrong",
  });
});
