-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "role" "RoleUser" NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" "RoleUser" NOT NULL DEFAULT 'STUDENT';

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "role" "RoleUser" NOT NULL DEFAULT 'TEACHER';
