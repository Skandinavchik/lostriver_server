/*
  Warnings:

  - Made the column `description` on table `waters` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "waters" ALTER COLUMN "description" SET NOT NULL;
