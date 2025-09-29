import { Router } from "express";
import { postController } from "./post.controller";

const router = Router();

router
  .post("/", postController.createPost)
  .get("/", postController.getAllPosts);
router
  .get("/:id", postController.getPostById)
  .patch("/:id", postController.updatePost)
  .delete("/:id", postController.deletePost);
export const postRouter = router;
