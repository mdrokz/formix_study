/*
  Warnings:

  - You are about to drop the column `file_id` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[file_path]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Session_file_id_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "file_id",
ADD COLUMN     "file_path" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Session_file_path_key" ON "Session"("file_path");
