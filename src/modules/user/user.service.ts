import { prisma } from "../../config/db";
import { User } from "./user.interface";
import bcrypt from "bcrypt";
const createUser = async (user: User) => {
  if (!user.name || !user.email || !user.password)
    return "All fields are required";
  if (user.password.length < 6)
    return "Password must be at least 8 characters long";

  const hashedPassword = await bcrypt.hash(user.password, 10);
  const { role, ...rest } = user;
  const data: any = { ...rest, password: hashedPassword };
  if (role) {
    data.role = role as any;
  }
  console.log(data);
  const result = await prisma.user.create({ data });
  return result;
};

const logInUser = async (user: User) => {
  const { email, password } = user;
  console.log(user);
  if (!email || !password) throw new Error("All fields are required");
  const result = await prisma.user.findUnique({ where: { email: user.email } });
  if (!result) throw new Error("User not found");
  const matchPassword = await bcrypt.compare(
    password,
    result.password as string
  );
  if (!matchPassword) throw new Error("Invalid credentials");
  return result;
};
const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
  return result;
};

const getUserById = async (id: string) => {
  const result = await prisma.user.findUnique({ where: { id } });
  return result;
};
const updateUser = async (id: string, user: User) => {
  // Map string role to Prisma Role enum if present
  const { role, ...rest } = user;
  const data: any = { ...rest };
  if (role) {
    data.role = role as any;
  }
  const result = await prisma.user.update({ where: { id }, data });
  return result;
};
export const userService = {
  createUser,
  logInUser,
  getAllUsers,
  getUserById,
  updateUser,
};
