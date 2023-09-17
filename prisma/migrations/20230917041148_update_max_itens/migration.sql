/*
  Warnings:

  - You are about to drop the column `max_itens` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "max_itens";
ALTER TABLE "Guild" ADD COLUMN     "max_items" INT4 NOT NULL DEFAULT 1;
