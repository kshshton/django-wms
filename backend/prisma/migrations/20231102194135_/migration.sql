/*
  Warnings:

  - The primary key for the `Sector` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sectorId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "sectorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Sector" DROP CONSTRAINT "Sector_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sector_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sector_id_seq";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;
