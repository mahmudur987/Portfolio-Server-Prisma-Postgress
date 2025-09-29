import { Request, Response } from "express";
import { postService } from "./post.service";
import { catchAsync } from "../../utils/CatchAsync";
import statusCode from "http-status-codes";
import sendResponse from "../../utils/sendResponse";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.createPost(req.body);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getAllPosts(
    req.query as Record<string, string>
  );
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Posts fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getPostById(req.params.id);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Post fetched successfully",
    data: result,
  });
});
const updatePost = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.updatePost(req.params.id, req.body);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Post updated successfully",
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.deletePost(req.params.id);
  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Post deleted successfully",
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
0;
