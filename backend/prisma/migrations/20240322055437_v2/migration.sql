/*
  Warnings:

  - You are about to drop the column `rombel` on the `Rapor` table. All the data in the column will be lost.
  - You are about to drop the `RombelOnModulAjar` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idMurid]` on the table `Rapor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idRombel` to the `Murid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Murid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idGuru` to the `Rapor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idRombel` to the `Rapor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaRombel` to the `Rapor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rapor" DROP CONSTRAINT "Rapor_idMurid_fkey";

-- DropForeignKey
ALTER TABLE "RombelOnModulAjar" DROP CONSTRAINT "RombelOnModulAjar_idModulAjar_fkey";

-- DropForeignKey
ALTER TABLE "RombelOnModulAjar" DROP CONSTRAINT "RombelOnModulAjar_idRombel_fkey";

-- AlterTable
ALTER TABLE "Murid" ADD COLUMN     "idRombel" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rapor" DROP COLUMN "rombel",
ADD COLUMN     "idGuru" TEXT NOT NULL,
ADD COLUMN     "idRombel" TEXT NOT NULL,
ADD COLUMN     "namaRombel" TEXT NOT NULL;

-- DropTable
DROP TABLE "RombelOnModulAjar";

-- CreateTable
CREATE TABLE "GuruOnModulAjar" (
    "id" TEXT NOT NULL,
    "idGuru" TEXT NOT NULL,
    "idModulAjar" TEXT NOT NULL,

    CONSTRAINT "GuruOnModulAjar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GuruOnModulAjar_id_idGuru_idModulAjar_idx" ON "GuruOnModulAjar"("id", "idGuru", "idModulAjar");

-- CreateIndex
CREATE UNIQUE INDEX "Rapor_idMurid_key" ON "Rapor"("idMurid");

-- AddForeignKey
ALTER TABLE "Murid" ADD CONSTRAINT "Murid_idRombel_fkey" FOREIGN KEY ("idRombel") REFERENCES "Rombel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuruOnModulAjar" ADD CONSTRAINT "GuruOnModulAjar_idGuru_fkey" FOREIGN KEY ("idGuru") REFERENCES "Guru"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuruOnModulAjar" ADD CONSTRAINT "GuruOnModulAjar_idModulAjar_fkey" FOREIGN KEY ("idModulAjar") REFERENCES "ModulAjar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idMurid_fkey" FOREIGN KEY ("idMurid") REFERENCES "Murid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idGuru_fkey" FOREIGN KEY ("idGuru") REFERENCES "Guru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idRombel_fkey" FOREIGN KEY ("idRombel") REFERENCES "Rombel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
