-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('carp', 'grayling', 'hucho', 'trout');

-- AlterTable
ALTER TABLE "Water" ADD COLUMN     "LicenseType" "LicenseType"[];
