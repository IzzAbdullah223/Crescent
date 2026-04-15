/*
  Warnings:

  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `githubLink` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `website` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "bio" SET DEFAULT '',
ALTER COLUMN "githubLink" SET NOT NULL,
ALTER COLUMN "githubLink" SET DEFAULT '',
ALTER COLUMN "website" SET NOT NULL,
ALTER COLUMN "website" SET DEFAULT '';
