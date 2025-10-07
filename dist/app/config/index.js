"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const adminEmail = "admin@gmail.com";
        const adminPass = "123456";
        const hashed = yield bcrypt_1.default.hash(adminPass, 10);
        const existing = yield db_1.default.user.findUnique({
            where: { email: adminEmail },
        });
        console.log("connectDB");
        if (!existing) {
            yield db_1.default.user.create({
                data: {
                    email: adminEmail,
                    password: hashed,
                    name: "Portfolio Owner",
                    role: "ADMIN",
                    phone: "01671706882",
                    picture: "https://i.pravatar.cc/150?img=1",
                },
            });
            console.log(`Seeded admin -> ${adminEmail} / ${adminPass}`);
        }
        else {
            console.log("Admin already exists, skipping seed.");
        }
    });
}
function connectDB() {
    main()
        .then(() => __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.$disconnect();
    }))
        .catch((e) => __awaiter(this, void 0, void 0, function* () {
        console.error(e);
        yield db_1.default.$disconnect();
        process.exit(1);
    }));
}
exports.default = connectDB;
