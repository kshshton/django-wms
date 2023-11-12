/*
  Warnings:

  - You are about to drop the column `addressId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerEmail]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addressId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "customerEmail" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "Address_customerEmail_key" ON "Address"("customerEmail");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_customerEmail_fkey" FOREIGN KEY ("customerEmail") REFERENCES "Customer"("email") ON DELETE SET NULL ON UPDATE CASCADE;
