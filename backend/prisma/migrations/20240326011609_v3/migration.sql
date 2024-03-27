/*
  Warnings:

  - You are about to drop the column `idModulAjar` on the `Mapel` table. All the data in the column will be lost.
  - The `status` column on the `Murid` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `namaMapel` on the `PenilaianMingguan` table. All the data in the column will be lost.
  - You are about to drop the column `jenisSemester` on the `Rapor` table. All the data in the column will be lost.
  - You are about to drop the column `namaKepsek` on the `Rapor` table. All the data in the column will be lost.
  - You are about to drop the column `namaRombel` on the `Rapor` table. All the data in the column will be lost.
  - You are about to drop the column `nipKepsek` on the `Rapor` table. All the data in the column will be lost.
  - You are about to drop the column `tahunAjaran` on the `Rapor` table. All the data in the column will be lost.
  - You are about to drop the column `tglRapor` on the `Rapor` table. All the data in the column will be lost.
  - You are about to drop the column `alias` on the `Rombel` table. All the data in the column will be lost.
  - You are about to drop the column `kelompokUsia` on the `Rombel` table. All the data in the column will be lost.
  - You are about to drop the column `tahunAjaran` on the `Semester` table. All the data in the column will be lost.
  - You are about to drop the column `tglRapor` on the `Semester` table. All the data in the column will be lost.
  - You are about to drop the `GuruOnModulAjar` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idRombel` to the `JadwalAjar` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `hari` on the `JadwalAjar` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `endDate` to the `ModulAjar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idMapel` to the `ModulAjar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idRombel` to the `ModulAjar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `ModulAjar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `catatanAgamaBudipekerti` to the `Rapor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `catatanJatiDiri` to the `Rapor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `catatanLiterasiSains` to the `Rapor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idKategoriRombel` to the `Rombel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaKepsek` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nipKepsek` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahunAjaranAkhir` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahunAjaranAwal` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tglBagiRapor` to the `Semester` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HariType" AS ENUM ('SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU');

-- CreateEnum
CREATE TYPE "StatusAbsensi" AS ENUM ('HADIR', 'IZIN', 'SAKIT', 'ALPA');

-- DropForeignKey
ALTER TABLE "Guru" DROP CONSTRAINT "Guru_idUser_fkey";

-- DropForeignKey
ALTER TABLE "GuruOnModulAjar" DROP CONSTRAINT "GuruOnModulAjar_idGuru_fkey";

-- DropForeignKey
ALTER TABLE "GuruOnModulAjar" DROP CONSTRAINT "GuruOnModulAjar_idModulAjar_fkey";

-- DropForeignKey
ALTER TABLE "JadwalAjar" DROP CONSTRAINT "JadwalAjar_idModulAjar_fkey";

-- DropForeignKey
ALTER TABLE "Mapel" DROP CONSTRAINT "Mapel_idModulAjar_fkey";

-- DropForeignKey
ALTER TABLE "Murid" DROP CONSTRAINT "Murid_idRombel_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianMingguan" DROP CONSTRAINT "PenilaianMingguan_idModulAjar_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianMingguan" DROP CONSTRAINT "PenilaianMingguan_idMurid_fkey";

-- DropForeignKey
ALTER TABLE "Rapor" DROP CONSTRAINT "Rapor_idGuru_fkey";

-- DropForeignKey
ALTER TABLE "Rapor" DROP CONSTRAINT "Rapor_idRombel_fkey";

-- DropForeignKey
ALTER TABLE "Rapor" DROP CONSTRAINT "Rapor_idSekolah_fkey";

-- DropForeignKey
ALTER TABLE "Rapor" DROP CONSTRAINT "Rapor_idSemester_fkey";

-- DropForeignKey
ALTER TABLE "Rombel" DROP CONSTRAINT "Rombel_idGuru_fkey";

-- DropIndex
DROP INDEX "JadwalAjar_id_idModulAjar_idx";

-- DropIndex
DROP INDEX "Rapor_id_idSekolah_idSemester_idMurid_idx";

-- DropIndex
DROP INDEX "Rombel_id_idGuru_idx";

-- DropIndex
DROP INDEX "Semester_id_tahunAjaran_idx";

-- AlterTable
ALTER TABLE "JadwalAjar" ADD COLUMN     "idRombel" TEXT NOT NULL,
DROP COLUMN "hari",
ADD COLUMN     "hari" "HariType" NOT NULL;

-- AlterTable
ALTER TABLE "Mapel" DROP COLUMN "idModulAjar",
ALTER COLUMN "isAktif" SET DEFAULT true;

-- AlterTable
ALTER TABLE "ModulAjar" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "idMapel" TEXT NOT NULL,
ADD COLUMN     "idRombel" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Murid" ALTER COLUMN "tempatLahir" DROP NOT NULL,
ALTER COLUMN "tanggalLahir" DROP NOT NULL,
ALTER COLUMN "agama" DROP NOT NULL,
ALTER COLUMN "alamat" DROP NOT NULL,
ALTER COLUMN "tanggalMasuk" DROP NOT NULL,
ALTER COLUMN "tinggiBadan" DROP NOT NULL,
ALTER COLUMN "beratBadan" DROP NOT NULL,
ALTER COLUMN "foto" DROP NOT NULL,
ALTER COLUMN "namaAyah" DROP NOT NULL,
ALTER COLUMN "namaIbu" DROP NOT NULL,
ALTER COLUMN "pekerjaanAyah" DROP NOT NULL,
ALTER COLUMN "pekerjaanIbu" DROP NOT NULL,
ALTER COLUMN "idRombel" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusAkun" NOT NULL DEFAULT 'AKTIF';

-- AlterTable
ALTER TABLE "PenilaianMingguan" DROP COLUMN "namaMapel";

-- AlterTable
ALTER TABLE "Rapor" DROP COLUMN "jenisSemester",
DROP COLUMN "namaKepsek",
DROP COLUMN "namaRombel",
DROP COLUMN "nipKepsek",
DROP COLUMN "tahunAjaran",
DROP COLUMN "tglRapor",
ADD COLUMN     "catatanAgamaBudipekerti" TEXT NOT NULL,
ADD COLUMN     "catatanJatiDiri" TEXT NOT NULL,
ADD COLUMN     "catatanLiterasiSains" TEXT NOT NULL,
ALTER COLUMN "totalSakit" DROP NOT NULL,
ALTER COLUMN "totalIzin" DROP NOT NULL,
ALTER COLUMN "totalAlpa" DROP NOT NULL,
ALTER COLUMN "idGuru" DROP NOT NULL,
ALTER COLUMN "idRombel" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Rombel" DROP COLUMN "alias",
DROP COLUMN "kelompokUsia",
ADD COLUMN     "idKategoriRombel" TEXT NOT NULL,
ALTER COLUMN "idGuru" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "tahunAjaran",
DROP COLUMN "tglRapor",
ADD COLUMN     "isAktif" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "namaKepsek" TEXT NOT NULL,
ADD COLUMN     "nipKepsek" TEXT NOT NULL,
ADD COLUMN     "tahunAjaranAkhir" INTEGER NOT NULL,
ADD COLUMN     "tahunAjaranAwal" INTEGER NOT NULL,
ADD COLUMN     "tglBagiRapor" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "foto" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "GuruOnModulAjar";

-- CreateTable
CREATE TABLE "KategoriRombel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kelompokUsia" TEXT NOT NULL,
    "kode" TEXT NOT NULL,

    CONSTRAINT "KategoriRombel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" TEXT NOT NULL,
    "status" "StatusAbsensi" NOT NULL,
    "keterangan" TEXT,
    "idJadwalAjar" TEXT NOT NULL,
    "idMurid" TEXT NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KategoriRombel_kode_key" ON "KategoriRombel"("kode");

-- CreateIndex
CREATE INDEX "KategoriRombel_id_kode_idx" ON "KategoriRombel"("id", "kode");

-- CreateIndex
CREATE INDEX "Absensi_id_idJadwalAjar_idMurid_idx" ON "Absensi"("id", "idJadwalAjar", "idMurid");

-- CreateIndex
CREATE INDEX "JadwalAjar_id_idModulAjar_idRombel_idx" ON "JadwalAjar"("id", "idModulAjar", "idRombel");

-- CreateIndex
CREATE INDEX "Rapor_id_idSekolah_idSemester_idMurid_idGuru_idRombel_idx" ON "Rapor"("id", "idSekolah", "idSemester", "idMurid", "idGuru", "idRombel");

-- CreateIndex
CREATE INDEX "Rombel_id_idGuru_idKategoriRombel_idx" ON "Rombel"("id", "idGuru", "idKategoriRombel");

-- CreateIndex
CREATE INDEX "Semester_id_idx" ON "Semester"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Guru" ADD CONSTRAINT "Guru_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Murid" ADD CONSTRAINT "Murid_idRombel_fkey" FOREIGN KEY ("idRombel") REFERENCES "Rombel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rombel" ADD CONSTRAINT "Rombel_idGuru_fkey" FOREIGN KEY ("idGuru") REFERENCES "Guru"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rombel" ADD CONSTRAINT "Rombel_idKategoriRombel_fkey" FOREIGN KEY ("idKategoriRombel") REFERENCES "KategoriRombel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulAjar" ADD CONSTRAINT "ModulAjar_idMapel_fkey" FOREIGN KEY ("idMapel") REFERENCES "Mapel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulAjar" ADD CONSTRAINT "ModulAjar_idRombel_fkey" FOREIGN KEY ("idRombel") REFERENCES "Rombel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalAjar" ADD CONSTRAINT "JadwalAjar_idModulAjar_fkey" FOREIGN KEY ("idModulAjar") REFERENCES "ModulAjar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalAjar" ADD CONSTRAINT "JadwalAjar_idRombel_fkey" FOREIGN KEY ("idRombel") REFERENCES "Rombel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_idJadwalAjar_fkey" FOREIGN KEY ("idJadwalAjar") REFERENCES "JadwalAjar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_idMurid_fkey" FOREIGN KEY ("idMurid") REFERENCES "Murid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianMingguan" ADD CONSTRAINT "PenilaianMingguan_idModulAjar_fkey" FOREIGN KEY ("idModulAjar") REFERENCES "ModulAjar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianMingguan" ADD CONSTRAINT "PenilaianMingguan_idMurid_fkey" FOREIGN KEY ("idMurid") REFERENCES "Murid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idSekolah_fkey" FOREIGN KEY ("idSekolah") REFERENCES "Sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idSemester_fkey" FOREIGN KEY ("idSemester") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idGuru_fkey" FOREIGN KEY ("idGuru") REFERENCES "Guru"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idRombel_fkey" FOREIGN KEY ("idRombel") REFERENCES "Rombel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
