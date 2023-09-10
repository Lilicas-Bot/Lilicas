-- CreateTable
CREATE TABLE "Player" (
    "id" CHAR(36) NOT NULL,
    "discord_id" TEXT NOT NULL,
    "money" INTEGER NOT NULL DEFAULT 0,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_discord_id_key" ON "Player"("discord_id");
