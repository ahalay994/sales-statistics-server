/*
  Warnings:

  - The primary key for the `CategoryRelation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `parentId` on the `CategoryRelation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryRelation" DROP CONSTRAINT "CategoryRelation_parentId_fkey";

-- AlterTable
ALTER TABLE "CategoryRelation" DROP CONSTRAINT "CategoryRelation_pkey",
DROP COLUMN "parentId",
ADD CONSTRAINT "CategoryRelation_pkey" PRIMARY KEY ("childrenId");

-- AddForeignKey
ALTER TABLE "CategoryRelation" ADD CONSTRAINT "CategoryRelation_childrenId_fkey" FOREIGN KEY ("childrenId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
