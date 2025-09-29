-- CreateEnum
CREATE TYPE "public"."projectType" AS ENUM ('Personal', 'Client');

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "projectType" "public"."projectType" NOT NULL DEFAULT 'Personal';
