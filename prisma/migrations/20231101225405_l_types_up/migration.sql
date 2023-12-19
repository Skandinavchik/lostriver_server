/*
  Warnings:

  - You are about to drop the column `LicenseType` on the `Water` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Water" DROP COLUMN "LicenseType",
ADD COLUMN     "licenseType" "LicenseType"[];
