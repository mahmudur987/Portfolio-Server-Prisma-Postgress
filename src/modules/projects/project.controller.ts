import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { projectService } from "./project.service";
import statusCode from "http-status-codes";

const createProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.createProjects(req.body);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});
const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.getAllProjects();
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Projects fetched successfully",
    data: result,
  });
});
export const projectController = {
  createProjects,
  getAllProjects,
};
