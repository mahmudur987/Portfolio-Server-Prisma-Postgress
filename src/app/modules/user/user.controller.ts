import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import statusCode from "http-status-codes";
import { catchAsync } from "../../utils/CatchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "User created   successfully",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUserById(req.params.id);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});
const logInUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.logInUser(req.body);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.updateUser(req.params.id, req.body);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  logInUser,
  updateUser,
};
