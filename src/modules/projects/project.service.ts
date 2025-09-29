import { projectType } from "@prisma/client";
import { prisma } from "../../config/db";
import { Project } from "./projects.interface";

const createProjects = async (project: Project) => {
  const result = await prisma.project.create({
    data: {
      ...project,
      projectType: project.projectType as projectType,
      startDate: new Date(project.startDate),
      endDate: new Date(project.endDate),
    },
  });
  return result;
};

const getAllProjects = async (query: Record<string, string>) => {
  const { limit = 10, page = 1, search = "", isPublished, tags } = query;
  let providedTags: string[] | undefined;
  if (tags) {
    providedTags = tags.split(",");
  }
  const whereConditions: any[] = [];

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
  const result = await prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: Number(limit),
    skip: (Number(page) - 1) * Number(limit),
  });

  const totalDoc = await prisma.project.count({
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
};

const getProjectById = async (id: string) => {
  const result = await prisma.project.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateProject = async (id: string, project: Project) => {
  const dataToUpdate: any = project;

  if (project.projectType) {
    dataToUpdate.projectType = project.projectType as projectType;
  }

  if (project.startDate) {
    dataToUpdate.startDate = new Date(project.startDate);
  }

  if (project.endDate) {
    dataToUpdate.endDate = new Date(project.endDate);
  }

  const result = await prisma.project.update({
    where: {
      id,
    },
    data: dataToUpdate,
  });
  return result;
};

const deleteProject = async (id: string) => {
  const result = await prisma.project.delete({
    where: {
      id,
    },
  });
  return result;
};

export const projectService = {
  createProjects,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
