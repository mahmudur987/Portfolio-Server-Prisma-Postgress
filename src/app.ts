import compression from "compression";
import cors from "cors";
import express from "express";
import { globalErrorHandler } from "./app/ErrorHandler/GlobalError";
import { notFound } from "./app/middlewere/NotFound";
import { userRouter } from "./app/modules/user/user.route";
import { postRouter } from "./app/modules/post/post.route";
import { projectRouter } from "./app/modules/projects/project.route";

const app = express();

// Middleware

app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Default route for testing

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/project", projectRouter);
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
app.use(globalErrorHandler);
app.use(notFound);
export default app;
