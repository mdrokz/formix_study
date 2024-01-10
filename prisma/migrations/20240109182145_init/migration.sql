/*
  Warnings:

  - Added the required column `completion_id` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model_usage` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "completion_id" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "model_usage" JSONB NOT NULL,
ALTER COLUMN "feedback" DROP NOT NULL,
ALTER COLUMN "feedback" SET DEFAULT '',
ALTER COLUMN "average_tta" DROP NOT NULL,
ALTER COLUMN "average_tta" SET DEFAULT 0,
ALTER COLUMN "accuracy" DROP NOT NULL,
ALTER COLUMN "accuracy" SET DEFAULT 0,
ALTER COLUMN "no_of_questions" DROP NOT NULL,
ALTER COLUMN "no_of_questions" SET DEFAULT 0,
ALTER COLUMN "total_time" DROP NOT NULL,
ALTER COLUMN "total_time" SET DEFAULT 0;
