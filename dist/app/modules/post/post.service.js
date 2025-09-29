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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const db_1 = require("../../config/db");
const createPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.post.create({ data: post });
    return result;
});
const getAllPosts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 1, search = "", isFeatured, tags } = query;
    let providedTags;
    if (tags) {
        providedTags = tags.split(",");
    }
    const whereConditions = [];
    if (search) {
        whereConditions.push({
            OR: [
                { title: { contains: search, mode: "insensitive" } },
                { content: { contains: search, mode: "insensitive" } },
            ],
        });
    }
    if (isFeatured) {
        whereConditions.push({
            isFeatured: isFeatured === "true" ? true : false,
        });
    }
    if (providedTags) {
        whereConditions.push({
            tags: { hasEvery: providedTags },
        });
    }
    const where = whereConditions.length ? { AND: whereConditions } : {};
    const result = yield db_1.prisma.post.findMany({
        where,
        include: {
            author: true,
        },
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
    });
    const totalDoc = yield db_1.prisma.post.count({
        where,
    });
    const meta = {
        totalDoc,
        page: Number(page),
        limit: Number(limit),
        totalPage: Math.ceil(totalDoc / Number(limit)),
    };
    return {
        data: result,
        meta,
    };
});
const getPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.post.findUnique({
        where: { id },
        include: { author: true },
    });
    return result;
});
const updatePost = (id, post) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.post.update({ where: { id }, data: post });
    return result;
});
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.post.delete({ where: { id } });
    return result;
});
exports.postService = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
