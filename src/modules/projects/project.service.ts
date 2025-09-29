import { prisma } from "../../config/db";
import { Project } from "./projects.interface";

const createProjects = async (project: Project) => {
  const projects = {
    ...project,
    startDate: new Date(project.startDate),
    endDate: new Date(project.endDate),
  };
  const result = await prisma.project.create({ data: projects });
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
      isFeatured: isFeatured === "true" ? true : false,
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
export const projectService = {
  createProjects,
  getAllProjects,
};
