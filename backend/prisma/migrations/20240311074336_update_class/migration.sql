/*
  Warnings:

  - You are about to drop the column `dailyScore` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `endScore` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `finalScore` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `midScore` on the `Result` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `academicYear` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `grade` on the `Class` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `descriptionKnowledge` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionSkill` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kkm` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `knowledgeScore` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predicatKnowledge` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predicatSkill` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillsScore` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortName` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('GANJIL', 'GENAP');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('FIRST', 'SECOND', 'THIRD');

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "academicYear" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "semester" "Semester" NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "grade",
ADD COLUMN     "grade" "Grade" NOT NULL;

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "dailyScore",
DROP COLUMN "endScore",
DROP COLUMN "finalScore",
DROP COLUMN "midScore",
ADD COLUMN     "descriptionKnowledge" TEXT NOT NULL,
ADD COLUMN     "descriptionSkill" TEXT NOT NULL,
ADD COLUMN     "kkm" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "knowledgeScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "predicatKnowledge" TEXT NOT NULL,
ADD COLUMN     "predicatSkill" TEXT NOT NULL,
ADD COLUMN     "skillsScore" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "avatar" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "shortName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "avatar" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");
