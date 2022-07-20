/*
  Warnings:

  - You are about to drop the `CategoryRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryRelation" DROP CONSTRAINT "CategoryRelation_childrenId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryRelation" DROP CONSTRAINT "CategoryRelation_parentId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "parentId" INTEGER;

-- DropTable
DROP TABLE "CategoryRelation";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
