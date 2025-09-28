import compression from "compression";
import cors from "cors";
import express from "express";
import { userRouter } from "./modules/user/user.route";
import { postRouter } from "./modules/post/post.route";
import { globalErrorHandler } from "./ErrorHandler/GlobalError";
import { notFound } from "./middlewere/NotFound";

const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
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
