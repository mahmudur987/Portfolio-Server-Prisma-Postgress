import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await postService.getAllPosts(
      req.query as Record<string, string>
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const result = await postService.getPostById(req.params.id);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const updatePost = async (req: Request, res: Response) => {
  try {
    const result = await postService.updatePost(req.params.id, req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const result = await postService.deletePost(req.params.id);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const postController = {
  createPost,
  getAllPosts,
  getPostById,

  updatePost,
  deletePost,
};
0;
