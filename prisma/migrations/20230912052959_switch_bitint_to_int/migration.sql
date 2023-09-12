/*
  Warnings:

  - You are about to alter the column `xp` on the `Guild` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `xp` on the `Hero` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Guild" ALTER COLUMN "xp" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Hero" ALTER COLUMN "xp" SET DATA TYPE INTEGER;
