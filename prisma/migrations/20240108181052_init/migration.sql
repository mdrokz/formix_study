-- CreateEnum
CREATE TYPE "AnswerStatus" AS ENUM ('CORRECT', 'INCORRECT', 'UNANSWERED');

-- CreateEnum
CREATE TYPE "PromptType" AS ENUM ('CUSTOM', 'ONE', 'TWO');

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "tta" DECIMAL(65,30) NOT NULL,
    "status" "AnswerStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "prompt_type" "PromptType" NOT NULL,
    "email" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "average_tta" DECIMAL(65,30) NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "no_of_questions" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Questions_user_id_key" ON "Questions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_user_id_key" ON "Session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_email_key" ON "Session"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_file_id_key" ON "Session"("file_id");

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
