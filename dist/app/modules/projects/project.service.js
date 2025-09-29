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
exports.projectService = void 0;
const db_1 = require("../../../app/config/db");
const createProjects = (project) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.create({
        data: Object.assign(Object.assign({}, project), { projectType: project.projectType, startDate: new Date(project.startDate), endDate: new Date(project.endDate) }),
    });
    return result;
});
const getAllProjects = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 1, search = "", isPublished, tags } = query;
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
    if (isPublished) {
        whereConditions.push({
            isPublished: isPublished === "true" ? true : false,
        });
    }
    if (providedTags) {
        whereConditions.push({
            tags: { hasEvery: providedTags },
        });
    }
    const where = whereConditions.length ? { AND: whereConditions } : {};
    const result = yield db_1.prisma.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
    });
    const totalDoc = yield db_1.prisma.project.count({
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
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateProject = (id, project) => __awaiter(void 0, void 0, void 0, function* () {
    const dataToUpdate = project;
    if (project.projectType) {
        dataToUpdate.projectType = project.projectType;
    }
    if (project.startDate) {
        dataToUpdate.startDate = new Date(project.startDate);
    }
    if (project.endDate) {
        dataToUpdate.endDate = new Date(project.endDate);
    }
    const result = yield db_1.prisma.project.update({
        where: {
            id,
        },
        data: dataToUpdate,
    });
    return result;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.projectService = {
    createProjects,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
