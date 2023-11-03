/*
  Warnings:

  - You are about to drop the column `sectorId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sectorId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sectorId",
ADD COLUMN     "sectorName" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sectorName_fkey" FOREIGN KEY ("sectorName") REFERENCES "Sector"("name") ON DELETE SET NULL ON UPDATE CASCADE;
