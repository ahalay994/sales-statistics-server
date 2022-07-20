/*
  Warnings:

  - The primary key for the `CategoryRelation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `CategoryRelation` table. All the data in the column will be lost.
  - Added the required column `childrenId` to the `CategoryRelation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoryRelation" DROP CONSTRAINT "CategoryRelation_categoryId_fkey";

-- AlterTable
ALTER TABLE "CategoryRelation" DROP CONSTRAINT "CategoryRelation_pkey",
DROP COLUMN "categoryId",
ADD COLUMN     "childrenId" INTEGER NOT NULL,
ADD CONSTRAINT "CategoryRelation_pkey" PRIMARY KEY ("childrenId", "parentId");

-- AddForeignKey
ALTER TABLE "CategoryRelation" ADD CONSTRAINT "CategoryRelation_childrenId_fkey" FOREIGN KEY ("childrenId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
