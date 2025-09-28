import { prisma } from "../../config/db";

const createUser = async (user: User) => {
  const result = await prisma.user.create({ data: user });
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

export const userService = {
  createUser,
  getAllUsers,
  getUserById,
};
