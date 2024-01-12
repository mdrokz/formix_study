/*
  Warnings:

  - Added the required column `key` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "key" TEXT NOT NULL,
ALTER COLUMN "answer" DROP NOT NULL,
ALTER COLUMN "answer" SET DEFAULT '',
ALTER COLUMN "tta" DROP NOT NULL,
ALTER COLUMN "tta" SET DEFAULT 0,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UNANSWERED';
