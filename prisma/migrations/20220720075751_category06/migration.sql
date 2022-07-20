/*
  Warnings:

  - The primary key for the `CategoryRelation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `parentId` to the `CategoryRelation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategoryRelation" DROP CONSTRAINT "CategoryRelation_pkey",
ADD COLUMN     "parentId" INTEGER NOT NULL,
ADD CONSTRAINT "CategoryRelation_pkey" PRIMARY KEY ("childrenId", "parentId");

-- AddForeignKey
ALTER TABLE "CategoryRelation" ADD CONSTRAINT "CategoryRelation_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
