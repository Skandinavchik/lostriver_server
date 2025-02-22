/*
  Warnings:

  - You are about to drop the column `createdAt` on the `waters` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `waters` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `waters` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serial_number]` on the table `waters` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serial_number` to the `waters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `waters` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "waters_serialNumber_key";

-- AlterTable
ALTER TABLE "waters" DROP COLUMN "createdAt",
DROP COLUMN "serialNumber",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "serial_number" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "waters_serial_number_key" ON "waters"("serial_number");
