/*
  Warnings:

  - You are about to drop the column `user_id` on the `Questions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Questions_user_id_key";

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "user_id";
