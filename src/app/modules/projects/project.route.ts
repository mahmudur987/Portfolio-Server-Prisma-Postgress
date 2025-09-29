import { Router } from "express";
import { projectController } from "./project.controller";

const router = Router();
router
  .post("/", projectController.createProjects)
  .get("/", projectController.getAllProjects);
router
  .get("/:id", projectController.getProjectById)
  .patch("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);
export const projectRouter = router;
