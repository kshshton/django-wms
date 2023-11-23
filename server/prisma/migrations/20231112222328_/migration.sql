-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "buildingNumber" SET DATA TYPE TEXT,
ALTER COLUMN "apartmentNumber" DROP NOT NULL;
