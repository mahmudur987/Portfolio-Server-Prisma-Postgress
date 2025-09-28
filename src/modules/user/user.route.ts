import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router
  .post("/", userController.createUser)
  .get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
export const userRouter = router;
