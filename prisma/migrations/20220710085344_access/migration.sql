/*
  Warnings:

  - You are about to alter the column `slug` on the `Access` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `Access` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `firstName` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `lastName` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `patronymicName` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "Access" ALTER COLUMN "slug" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "patronymicName" SET DATA TYPE VARCHAR(30);
