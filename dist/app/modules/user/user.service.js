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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../../app/config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.name || !user.email || !user.password)
        return "All fields are required";
    if (user.password.length < 6)
        return "Password must be at least 8 characters long";
    const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
    const { role } = user, rest = __rest(user, ["role"]);
    const data = Object.assign(Object.assign({}, rest), { password: hashedPassword });
    if (role) {
        data.role = role;
    }
    console.log(data);
    const result = yield db_1.prisma.user.create({ data });
    return result;
});
const logInUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = user;
    console.log(user);
    if (!email || !password)
        throw new Error("All fields are required");
    const result = yield db_1.prisma.user.findUnique({ where: { email: user.email } });
    if (!result)
        throw new Error("User not found");
    const matchPassword = yield bcrypt_1.default.compare(password, result.password);
    if (!matchPassword)
        throw new Error("Invalid credentials");
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });
    return result;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.user.findUnique({ where: { id } });
    return result;
});
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    // Map string role to Prisma Role enum if present
    const { role } = user, rest = __rest(user, ["role"]);
    const data = Object.assign({}, rest);
    if (role) {
        data.role = role;
    }
    const result = yield db_1.prisma.user.update({ where: { id }, data });
    return result;
});
exports.userService = {
    createUser,
    logInUser,
    getAllUsers,
    getUserById,
    updateUser,
};
