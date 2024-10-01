import { Request, Response } from "express";
import { UserService } from "@services/user/UserService";

export class UserController {
  constructor(private service: UserService) {}

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.service.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Missing id" });
      }

      const user = await this.service.getUserById(id);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ message: "Missing fields" });
      }
      const user = await this.service.createUser({ name, email, password });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const token = await this.service.loginUser(email, password);

      if (!token) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      console.log("token -> ", token);

      res.status(200).json({ token });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, password, profileDetails } = req.body;

      if (!id) {
        res.status(400).json({ message: "Missing id" });
      }

      const currentUser = await this.service.getUserById(id);

      if (!currentUser) {
        res.status(404).json({ message: "User not found" });
      }

      const user = await this.service.updateUser(id, {
        name,
        email,
        password,
        profileDetails,
      });
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Missing id" });
      }

      await this.service.deleteUser(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
