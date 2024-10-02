import { Router } from "express";

import { UserController } from "../../controllers/user/UserController";
import { UserService } from "../../services/user/UserService";
import { UserRepository } from "../../repositories/user/UserRepository";
import { AuthMiddleware } from "../../middlewares/index";

const router = Router();

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

router.post("/login", (req, res) => controller.login(req, res));

router.get("/users", AuthMiddleware as any, (req, res) =>
  controller.getUsers(req, res)
);

router.get("/users/:id", AuthMiddleware as any, (req, res) =>
  controller.getUserById(req, res)
);

router.put("/users/:id", AuthMiddleware as any, (req, res) =>
  controller.updateUser(req, res)
);

router.post("/users", (req, res) => controller.createUser(req, res));

router.delete("/users/:id", AuthMiddleware as any, (req, res) =>
  controller.deleteUser(req, res)
);

export default router;
