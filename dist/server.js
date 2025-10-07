"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./app/config"));
dotenv_1.default.config();
const port = process.env.PORT || 4000;
// Start the application
(() => {
    (0, config_1.default)();
})();
const server = app_1.default.listen(port, () => {
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
