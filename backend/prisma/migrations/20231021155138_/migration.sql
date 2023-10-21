/*
  Warnings:

  - You are about to drop the column `scannerId` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `Sector` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `capacity` on the `Sector` table. All the data in the column will be lost.
  - The `id` column on the `Sector` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Scanner` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `complete` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `sectorId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Sector` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_scannerId_fkey";

-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "scannerId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "complete" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sectorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sector" DROP CONSTRAINT "Sector_pkey",
DROP COLUMN "capacity",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ADD CONSTRAINT "Sector_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Scanner";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
