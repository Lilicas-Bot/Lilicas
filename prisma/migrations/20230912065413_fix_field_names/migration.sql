/*
  Warnings:

  - You are about to drop the column `party_id` on the `Hero` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hero" DROP CONSTRAINT "Hero_party_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_guild_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_hero_id_fkey";

-- AlterTable
ALTER TABLE "Hero" DROP COLUMN "party_id";

-- CreateTable
CREATE TABLE "_GuildToItem" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_HeroToItem" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_HeroToParty" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToItem_AB_unique" ON "_GuildToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToItem_B_index" ON "_GuildToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HeroToItem_AB_unique" ON "_HeroToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_HeroToItem_B_index" ON "_HeroToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HeroToParty_AB_unique" ON "_HeroToParty"("A", "B");

-- CreateIndex
CREATE INDEX "_HeroToParty_B_index" ON "_HeroToParty"("B");

-- AddForeignKey
ALTER TABLE "_GuildToItem" ADD CONSTRAINT "_GuildToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuildToItem" ADD CONSTRAINT "_GuildToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroToItem" ADD CONSTRAINT "_HeroToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroToItem" ADD CONSTRAINT "_HeroToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroToParty" ADD CONSTRAINT "_HeroToParty_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroToParty" ADD CONSTRAINT "_HeroToParty_B_fkey" FOREIGN KEY ("B") REFERENCES "Party"("id") ON DELETE CASCADE ON UPDATE CASCADE;
