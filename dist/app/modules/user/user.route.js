"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router
    .post("/", user_controller_1.userController.createUser)
    .get("/", user_controller_1.userController.getAllUsers);
router.get("/:id", user_controller_1.userController.getUserById);
router.post("/login", user_controller_1.userController.logInUser);
router.patch("/:id", user_controller_1.userController.updateUser);
exports.userRouter = router;
