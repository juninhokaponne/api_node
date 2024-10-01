import { UserRepository } from "@repositories/user/UserRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async getAllUsers() {
    try {
      const users = await this.repository.getAllUsersOnDatabase();

      if (!users) {
        throw new Error("No users found");
      }

      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.repository.getUserByIdOnDatabase(id);

      if (!user) {
        throw new Error("Any user found with this id");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createUser(data: { name: string; email: string; password: string }) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const userExists = await this.repository.findUserByEmail(data.email);

      if (userExists) {
        throw new Error("User already exists");
      }

      const user = await this.repository.createUserInDatabase({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });

      if (!user) {
        throw new Error("Error while creating user");
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      return { user, token };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    const user = await this.repository.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return token;
  }

  async deleteUser(id: string) {
    try {
      if (!id) {
        throw new Error("Missing id");
      }

      const user = await this.repository.getUserByIdOnDatabase(id);

      if (!user) {
        throw new Error("No user found");
      }

      await this.repository.deleteUserFromDatabase(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateUser(
    id: string,
    data: {
      name?: string;
      email?: string;
      password?: string;
      profileDetails?: {
        bio?: string;
        address?: string;
        city?: string;
        state?: string;
        country?: string;
        zip?: string;
      };
    }
  ) {
    try {
      if (!id) {
        throw new Error("Missing id");
      }

      const currentUser = await this.repository.getUserByIdOnDatabase(id);

      if (!currentUser) {
        throw new Error("User not found");
      }

      const hashedPassword = data.password
        ? await bcrypt.hash(data.password, 10)
        : undefined;

      const updatedUser = await this.repository.updateUserInDatabase(id, {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        profileDetails: data.profileDetails,
      });

      return updatedUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
