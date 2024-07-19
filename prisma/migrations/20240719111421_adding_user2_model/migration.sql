-- AlterTable
ALTER TABLE "Todo2" ADD COLUMN     "userEmail" TEXT;

-- CreateTable
CREATE TABLE "User2" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User2_email_key" ON "User2"("email");

-- CreateIndex
CREATE INDEX "Todo2_userEmail_idx" ON "Todo2"("userEmail");

-- AddForeignKey
ALTER TABLE "Todo2" ADD CONSTRAINT "Todo2_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User2"("email") ON DELETE SET NULL ON UPDATE CASCADE;
