import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserById(req.params.id);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
};
