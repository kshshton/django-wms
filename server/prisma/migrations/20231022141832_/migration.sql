/*
  Warnings:

  - You are about to drop the column `customerEmail` on the `Address` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_customerEmail_fkey";

-- DropIndex
DROP INDEX "Address_customerEmail_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "customerEmail";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "addressId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
