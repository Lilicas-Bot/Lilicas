/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "Guild" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "discord_id" TEXT NOT NULL,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "glory" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "xp" BIGINT NOT NULL DEFAULT 0,
    "npcs" INTEGER NOT NULL DEFAULT 0,
    "npcs_max" INTEGER NOT NULL DEFAULT 1,
    "max_itens" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "guild_id" UUID NOT NULL,
    "hero_id" UUID NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "xp" BIGINT NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "skill_points" INTEGER NOT NULL DEFAULT 0,
    "strength" INTEGER NOT NULL DEFAULT 1,
    "agility" INTEGER NOT NULL DEFAULT 1,
    "intellect" INTEGER NOT NULL DEFAULT 1,
    "vitality" INTEGER NOT NULL DEFAULT 1,
    "luck" INTEGER NOT NULL DEFAULT 1,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "guild_id" UUID NOT NULL,
    "party_id" UUID NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "guild_id" UUID NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adventure" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3),
    "guild_id" UUID NOT NULL,
    "party_id" UUID NOT NULL,

    CONSTRAINT "Adventure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_discord_id_key" ON "Guild"("discord_id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hero" ADD CONSTRAINT "Hero_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hero" ADD CONSTRAINT "Hero_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
