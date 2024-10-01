import { PrismaClient } from "@prisma/client";
import { UserEntity, UserWithoutPassword } from "@entities/user/UserEntity";

const prisma = new PrismaClient();

export class UserRepository {
  async getAllUsersOnDatabase(): Promise<UserWithoutPassword[]> {
    try {
      const users = await prisma.user.findMany();

      const usersWithoutPassword = users.map((user) =>
        this.excludePassword(user)
      );

      if (!users) {
        throw new Error("No users found");
      }

      return usersWithoutPassword;
    } catch (error) {
      throw new Error("Error while fetching users");
    }
  }

  async getUserByIdOnDatabase(id: string): Promise<UserWithoutPassword> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        throw new Error("No user found");
      }

      return this.excludePassword(user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createUserInDatabase(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserWithoutPassword> {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      return this.excludePassword(newUser);
    } catch (error) {
      throw new Error("Error while creating user");
    }
  }

  async findUserByEmail(email: string) {
    try {
      console.log("repository email -> ", email);

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      console.log("repository user -> ", user);

      return user;
    } catch (error: any) {
      console.log("repository error -> ", error);
      throw new Error(error.message);
    }
  }

  async updateUserInDatabase(
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
  ): Promise<UserWithoutPassword> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          profileDetails: data.profileDetails
            ? {
                upsert: {
                  create: {
                    bio: data.profileDetails.bio,
                    address: data.profileDetails.address,
                    city: data.profileDetails.city,
                    state: data.profileDetails.state,
                    country: data.profileDetails.country,
                    zip: data.profileDetails.zip,
                  },
                  update: {
                    bio: data.profileDetails.bio,
                    address: data.profileDetails.address,
                    city: data.profileDetails.city,
                    state: data.profileDetails.state,
                    country: data.profileDetails.country,
                    zip: data.profileDetails.zip,
                  },
                },
              }
            : undefined,
        },
        include: {
          profileDetails: true,
        },
      });

      return this.excludePassword(updatedUser);
    } catch (error) {
      console.error(error);
      throw new Error("Error while updating user");
    }
  }

  async deleteUserFromDatabase(id: string): Promise<void> {
    try {
      await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw new Error("Error while deleting user");
    }
  }

  private excludePassword(user: UserEntity): UserWithoutPassword {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserWithoutPassword;
  }
}
