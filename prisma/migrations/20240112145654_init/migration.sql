/*
  Warnings:

  - The primary key for the `Questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `question` on the `Questions` table. All the data in the column will be lost.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accuracy` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `average_tta` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `feedback` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `total_time` on the `Session` table. All the data in the column will be lost.
  - Added the required column `title` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Questions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `session_id` on the `Questions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_session_id_fkey";

-- AlterTable
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_pkey",
DROP COLUMN "question",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "session_id",
ADD COLUMN     "session_id" UUID NOT NULL,
ADD CONSTRAINT "Questions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "accuracy",
DROP COLUMN "average_tta",
DROP COLUMN "feedback",
DROP COLUMN "total_time",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Attempt" (
    "id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "feedback" TEXT NOT NULL,
    "topic_feedback" JSONB NOT NULL,
    "average_tta" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total_time" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "accuracy" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_user_id_key" ON "Session"("user_id");

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
