"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const GlobalError_1 = require("./app/ErrorHandler/GlobalError");
const NotFound_1 = require("./app/middlewere/NotFound");
const user_route_1 = require("./app/modules/user/user.route");
const post_route_1 = require("./app/modules/post/post.route");
const project_route_1 = require("./app/modules/projects/project.route");
const app = (0, express_1.default)();
// Middleware
app.use((0, compression_1.default)()); // Compresses response bodies for faster delivery
app.use(express_1.default.json()); // Parse incoming JSON requests
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
// Default route for testing
app.use("/api/v1/user", user_route_1.userRouter);
app.use("/api/v1/post", post_route_1.postRouter);
app.use("/api/v1/project", project_route_1.projectRouter);
app.get("/", (req, res) => {
    res.send("API is running");
});
// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});
app.use(GlobalError_1.globalErrorHandler);
app.use(NotFound_1.notFound);
exports.default = app;
