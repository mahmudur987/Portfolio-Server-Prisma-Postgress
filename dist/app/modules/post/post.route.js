"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const router = (0, express_1.Router)();
router
    .post("/", post_controller_1.postController.createPost)
    .get("/", post_controller_1.postController.getAllPosts);
router
    .get("/:id", post_controller_1.postController.getPostById)
    .patch("/:id", post_controller_1.postController.updatePost)
    .delete("/:id", post_controller_1.postController.deletePost);
exports.postRouter = router;
