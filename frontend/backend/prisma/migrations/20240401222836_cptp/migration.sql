/*
  Warnings:

  - You are about to drop the column `capaianPembelajaran` on the `ModulAjar` table. All the data in the column will be lost.
  - You are about to drop the column `idMapel` on the `ModulAjar` table. All the data in the column will be lost.
  - You are about to drop the column `tujuanPembelajaran` on the `ModulAjar` table. All the data in the column will be lost.
  - You are about to drop the column `tingkatan` on the `Rombel` table. All the data in the column will be lost.
  - You are about to drop the `Mapel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idTujuanPembelajaran` to the `ModulAjar` table without a default value. This is not possible if the table is not empty.
  - Made the column `idGuru` on table `Rapor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idRombel` on table `Rapor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ModulAjar" DROP CONSTRAINT "ModulAjar_idMapel_fkey";

-- DropForeignKey
ALTER TABLE "Rapor" DROP CONSTRAINT "Rapor_idGuru_fkey";

-- DropForeignKey
ALTER TABLE "Rapor" DROP CONSTRAINT "Rapor_idRombel_fkey";

-- DropIndex
DROP INDEX "Rombel_id_idGuru_idKategoriRombel_idx";

-- AlterTable
ALTER TABLE "ModulAjar" DROP COLUMN "capaianPembelajaran",
DROP COLUMN "idMapel",
DROP COLUMN "tujuanPembelajaran",
ADD COLUMN     "idTujuanPembelajaran" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rapor" ADD COLUMN     "rombelSemesterGuruId" TEXT,
ADD COLUMN     "rombelSemesterId" TEXT,
ALTER COLUMN "idGuru" SET NOT NULL,
ALTER COLUMN "idRombel" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rombel" DROP COLUMN "tingkatan",
ADD COLUMN     "isFull" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kuota" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Mapel";

-- CreateTable
CREATE TABLE "CapaianPembelajarn" (
    "id" TEXT NOT NULL,
    "capaianPembelajaranAgama" TEXT NOT NULL,
    "capaianPembelajaranJatiDiri" TEXT NOT NULL,
    "capaianPembelajaranLiterasiSains" TEXT NOT NULL,

    CONSTRAINT "CapaianPembelajarn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TujuanPembelajaran" (
    "id" TEXT NOT NULL,
    "minggu" INTEGER NOT NULL,
    "tujuanPembelajaranAgamaBudipekerti" TEXT NOT NULL,
    "tujuanPembelajaranJatiDiri" TEXT NOT NULL,
    "tujuanPembelajaranLiterasiSains" TEXT NOT NULL,
    "idCapaianPembelajaran" TEXT NOT NULL,

    CONSTRAINT "TujuanPembelajaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RombelSemesterGuru" (
    "id" TEXT NOT NULL,
    "idRombel" TEXT NOT NULL,
    "idSemester" TEXT NOT NULL,
    "idGuru" TEXT NOT NULL,

    CONSTRAINT "RombelSemesterGuru_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CapaianPembelajarn_id_idx" ON "CapaianPembelajarn"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TujuanPembelajaran_minggu_key" ON "TujuanPembelajaran"("minggu");

-- CreateIndex
CREATE INDEX "TujuanPembelajaran_id_minggu_idx" ON "TujuanPembelajaran"("id", "minggu");

-- CreateIndex
CREATE INDEX "RombelSemesterGuru_id_idRombel_idSemester_idGuru_idx" ON "RombelSemesterGuru"("id", "idRombel", "idSemester", "idGuru");

-- CreateIndex
CREATE INDEX "Rombel_id_idGuru_idKategoriRombel_name_idx" ON "Rombel"("id", "idGuru", "idKategoriRombel", "name");

-- AddForeignKey
ALTER TABLE "ModulAjar" ADD CONSTRAINT "ModulAjar_idTujuanPembelajaran_fkey" FOREIGN KEY ("idTujuanPembelajaran") REFERENCES "TujuanPembelajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TujuanPembelajaran" ADD CONSTRAINT "TujuanPembelajaran_idCapaianPembelajaran_fkey" FOREIGN KEY ("idCapaianPembelajaran") REFERENCES "CapaianPembelajarn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idGuru_fkey" FOREIGN KEY ("idGuru") REFERENCES "Guru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idRombel_fkey" FOREIGN KEY ("idRombel") REFERENCES "Rombel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_rombelSemesterGuruId_fkey" FOREIGN KEY ("rombelSemesterGuruId") REFERENCES "RombelSemesterGuru"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RombelSemesterGuru" ADD CONSTRAINT "RombelSemesterGuru_idGuru_fkey" FOREIGN KEY ("idGuru") REFERENCES "Guru"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RombelSemesterGuru" ADD CONSTRAINT "RombelSemesterGuru_idRombel_fkey" FOREIGN KEY ("idRombel") REFERENCES "Rombel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RombelSemesterGuru" ADD CONSTRAINT "RombelSemesterGuru_idSemester_fkey" FOREIGN KEY ("idSemester") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;
