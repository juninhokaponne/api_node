export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string
  ) {}
}

export interface UserEntity {
  id: number;
  name: string | null;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithoutPassword {
  id: number;
  name: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
