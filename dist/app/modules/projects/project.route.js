"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const router = (0, express_1.Router)();
router
    .post("/", project_controller_1.projectController.createProjects)
    .get("/", project_controller_1.projectController.getAllProjects);
router
    .get("/:id", project_controller_1.projectController.getProjectById)
    .patch("/:id", project_controller_1.projectController.updateProject);
router.delete("/:id", project_controller_1.projectController.deleteProject);
exports.projectRouter = router;
