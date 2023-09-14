-- CreateTable
CREATE TABLE "Guild" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "discord_id" STRING NOT NULL,
    "coins" INT4 NOT NULL DEFAULT 0,
    "glory" INT4 NOT NULL DEFAULT 0,
    "level" INT4 NOT NULL DEFAULT 1,
    "name" STRING,
    "description" STRING,
    "icon" STRING,
    "xp" INT4 NOT NULL DEFAULT 0,
    "npcs" INT4 NOT NULL DEFAULT 0,
    "npcs_max" INT4 NOT NULL DEFAULT 1,
    "max_itens" INT4 NOT NULL DEFAULT 1,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "type" STRING NOT NULL,
    "rarity" STRING NOT NULL,
    "icon" STRING NOT NULL,
    "quantity" INT4 NOT NULL DEFAULT 1,
    "guild_id" UUID NOT NULL,
    "hero_id" UUID NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "xp" INT4 NOT NULL DEFAULT 0,
    "level" INT4 NOT NULL DEFAULT 1,
    "skill_points" INT4 NOT NULL DEFAULT 0,
    "strength" INT4 NOT NULL DEFAULT 1,
    "agility" INT4 NOT NULL DEFAULT 1,
    "intellect" INT4 NOT NULL DEFAULT 1,
    "vitality" INT4 NOT NULL DEFAULT 1,
    "luck" INT4 NOT NULL DEFAULT 1,
    "available" BOOL NOT NULL DEFAULT true,
    "guild_id" UUID NOT NULL,

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
CREATE UNIQUE INDEX "Guild_discord_id_key" ON "Guild"("discord_id");

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
ALTER TABLE "Hero" ADD CONSTRAINT "Hero_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
