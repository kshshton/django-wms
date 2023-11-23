/*
  Warnings:

  - You are about to drop the column `address` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "address";

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "buildingNumber" INTEGER NOT NULL,
    "apartmentNumber" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_customerEmail_key" ON "Address"("customerEmail");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_customerEmail_fkey" FOREIGN KEY ("customerEmail") REFERENCES "Customer"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
