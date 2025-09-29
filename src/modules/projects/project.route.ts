import { Router } from "express";
import { projectController } from "./project.controller";

const router = Router();
router
  .post("/", projectController.createProjects)
  .get("/", projectController.getAllProjects);

export const projectRouter = router;
