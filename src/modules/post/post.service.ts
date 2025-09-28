import { Post } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (post: Post) => {
  const result = await prisma.post.create({ data: post });
  return result;
};

const getAllPosts = async (query: Record<string, string>) => {
  const { limit = 10, page = 1, search = "", isFeatured, tags } = query;
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
  console.log(where);
  const result = await prisma.post.findMany({
    where,
    include: {
      author: true,
    },
    take: Number(limit),
    skip: (Number(page) - 1) * Number(limit),
  });

  const totalDoc = await prisma.post.count({
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

const getPostById = async (id: string) => {
  const result = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });
  return result;
};

const updatePost = async (id: string, post: Post) => {
  const result = await prisma.post.update({ where: { id }, data: post });
  return result;
};
const deletePost = async (id: string) => {
  const result = await prisma.post.delete({ where: { id } });
  return result;
};
export const postService = {
  createPost,
  getAllPosts,
  getPostById,

  updatePost,
  deletePost,
};
