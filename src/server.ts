import app from "./app";
import dotenv from "dotenv";
import connectDB from "./app/config";

dotenv.config();
const port = process.env.PORT || 4000;
// Start the application
(() => {
  connectDB();
})();

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected ...server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.log("uncaught Exception detected ....server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGTERM", () => {
  console.log("Sigterm single detected ....server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGINT", () => {
  console.log("SIGINT single detected ....server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
