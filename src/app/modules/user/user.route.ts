import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router
  .post("/", userController.createUser)
  .get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.post("/login", userController.logInUser);
router.patch("/:id", userController.updateUser);

export const userRouter = router;
