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
  const result = await projectService.getAllProjects(
    req.query as Record<string, string>
  );
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Projects fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.getProjectById(req.params.id);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Project fetched successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.updateProject(req.params.id, req.body);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.deleteProject(req.params.id);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const projectController = {
  createProjects,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
