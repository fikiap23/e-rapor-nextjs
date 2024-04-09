-- CreateEnum
CREATE TYPE "SemesterType" AS ENUM ('GANJIL', 'GENAP');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GURU');

-- CreateEnum
CREATE TYPE "StatusAkun" AS ENUM ('AKTIF', 'TIDAK_AKTIF');

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "Agama" AS ENUM ('ISLAM', 'KATOLIK', 'KRISTEN', 'KONGHUCU', 'BUDHA', 'HINDU');

-- CreateEnum
CREATE TYPE "Nilai" AS ENUM ('BELUM_BERKEMBANG', 'MULAI_BERKEMBANG', 'SUDAH_BERKEMBANG');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "status" "StatusAkun" NOT NULL DEFAULT 'AKTIF',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guru" (
    "id" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenisKelamin" "JenisKelamin" NOT NULL,
    "idUser" TEXT NOT NULL,

    CONSTRAINT "Guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Murid" (
    "id" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenisKelamin" "JenisKelamin" NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "agama" "Agama" NOT NULL,
    "alamat" TEXT NOT NULL,
    "tanggalMasuk" TIMESTAMP(3) NOT NULL,
    "tinggiBadan" INTEGER NOT NULL,
    "beratBadan" INTEGER NOT NULL,
    "foto" TEXT NOT NULL,
    "namaAyah" TEXT NOT NULL,
    "namaIbu" TEXT NOT NULL,
    "pekerjaanAyah" TEXT NOT NULL,
    "pekerjaanIbu" TEXT NOT NULL,

    CONSTRAINT "Murid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rombel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tingkatan" INTEGER NOT NULL,
    "kelompokUsia" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "idGuru" TEXT NOT NULL,

    CONSTRAINT "Rombel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RombelOnModulAjar" (
    "id" TEXT NOT NULL,
    "idRombel" TEXT NOT NULL,
    "idModulAjar" TEXT NOT NULL,

    CONSTRAINT "RombelOnModulAjar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModulAjar" (
    "id" TEXT NOT NULL,
    "minggu" INTEGER NOT NULL,
    "topik" TEXT NOT NULL,
    "subtopik" TEXT NOT NULL,
    "capaianPembelajaran" TEXT NOT NULL,
    "katakunci" TEXT[],
    "tujuanPembelajaran" TEXT[],
    "tujuanKegiatan" TEXT[],
    "alatBahan" TEXT[],
    "petaKonsep" TEXT[],

    CONSTRAINT "ModulAjar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mapel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "isAktif" BOOLEAN NOT NULL,
    "idModulAjar" TEXT NOT NULL,

    CONSTRAINT "Mapel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JadwalAjar" (
    "id" TEXT NOT NULL,
    "hari" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "kegiatanInti" TEXT NOT NULL,
    "idModulAjar" TEXT NOT NULL,

    CONSTRAINT "JadwalAjar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenilaianMingguan" (
    "id" TEXT NOT NULL,
    "nilai" "Nilai" NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "namaMapel" TEXT NOT NULL,
    "idModulAjar" TEXT NOT NULL,
    "idMurid" TEXT NOT NULL,

    CONSTRAINT "PenilaianMingguan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL,
    "jenisSemester" "SemesterType" NOT NULL,
    "tahunAjaran" INTEGER NOT NULL,
    "tglRapor" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rapor" (
    "id" TEXT NOT NULL,
    "rombel" TEXT NOT NULL,
    "tglRapor" TIMESTAMP(3) NOT NULL,
    "jenisSemester" "SemesterType" NOT NULL,
    "tahunAjaran" INTEGER NOT NULL,
    "totalSakit" INTEGER NOT NULL,
    "totalIzin" INTEGER NOT NULL,
    "totalAlpa" INTEGER NOT NULL,
    "catatanPertumbuhan" TEXT NOT NULL,
    "catatanPancasila" TEXT NOT NULL,
    "catatanGuru" TEXT NOT NULL,
    "nipKepsek" TEXT NOT NULL,
    "namaKepsek" TEXT NOT NULL,
    "idSekolah" TEXT NOT NULL,
    "idSemester" TEXT NOT NULL,
    "idMurid" TEXT NOT NULL,

    CONSTRAINT "Rapor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sekolah" (
    "id" TEXT NOT NULL,
    "npsn" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "kodePos" TEXT NOT NULL,
    "noTelepon" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kelurahan" TEXT NOT NULL,
    "namaDisdik" TEXT NOT NULL,
    "namaKapsek" TEXT NOT NULL,
    "nipKepsek" TEXT NOT NULL,

    CONSTRAINT "Sekolah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_id_username_email_idx" ON "User"("id", "username", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Guru_nip_key" ON "Guru"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "Guru_idUser_key" ON "Guru"("idUser");

-- CreateIndex
CREATE INDEX "Guru_id_nip_idUser_idx" ON "Guru"("id", "nip", "idUser");

-- CreateIndex
CREATE UNIQUE INDEX "Murid_nisn_key" ON "Murid"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Murid_nis_key" ON "Murid"("nis");

-- CreateIndex
CREATE INDEX "Murid_id_nis_nisn_idx" ON "Murid"("id", "nis", "nisn");

-- CreateIndex
CREATE INDEX "Rombel_id_idGuru_idx" ON "Rombel"("id", "idGuru");

-- CreateIndex
CREATE INDEX "RombelOnModulAjar_id_idRombel_idModulAjar_idx" ON "RombelOnModulAjar"("id", "idRombel", "idModulAjar");

-- CreateIndex
CREATE INDEX "ModulAjar_id_minggu_idx" ON "ModulAjar"("id", "minggu");

-- CreateIndex
CREATE INDEX "Mapel_id_name_idx" ON "Mapel"("id", "name");

-- CreateIndex
CREATE INDEX "JadwalAjar_id_idModulAjar_idx" ON "JadwalAjar"("id", "idModulAjar");

-- CreateIndex
CREATE INDEX "PenilaianMingguan_id_idModulAjar_idMurid_idx" ON "PenilaianMingguan"("id", "idModulAjar", "idMurid");

-- CreateIndex
CREATE INDEX "Semester_id_tahunAjaran_idx" ON "Semester"("id", "tahunAjaran");

-- CreateIndex
CREATE INDEX "Rapor_id_idSekolah_idSemester_idMurid_idx" ON "Rapor"("id", "idSekolah", "idSemester", "idMurid");

-- CreateIndex
CREATE INDEX "Sekolah_id_npsn_idx" ON "Sekolah"("id", "npsn");

-- AddForeignKey
ALTER TABLE "Guru" ADD CONSTRAINT "Guru_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rombel" ADD CONSTRAINT "Rombel_idGuru_fkey" FOREIGN KEY ("idGuru") REFERENCES "Guru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RombelOnModulAjar" ADD CONSTRAINT "RombelOnModulAjar_idRombel_fkey" FOREIGN KEY ("idRombel") REFERENCES "Rombel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RombelOnModulAjar" ADD CONSTRAINT "RombelOnModulAjar_idModulAjar_fkey" FOREIGN KEY ("idModulAjar") REFERENCES "ModulAjar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapel" ADD CONSTRAINT "Mapel_idModulAjar_fkey" FOREIGN KEY ("idModulAjar") REFERENCES "ModulAjar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalAjar" ADD CONSTRAINT "JadwalAjar_idModulAjar_fkey" FOREIGN KEY ("idModulAjar") REFERENCES "ModulAjar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianMingguan" ADD CONSTRAINT "PenilaianMingguan_idModulAjar_fkey" FOREIGN KEY ("idModulAjar") REFERENCES "ModulAjar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianMingguan" ADD CONSTRAINT "PenilaianMingguan_idMurid_fkey" FOREIGN KEY ("idMurid") REFERENCES "Murid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idSekolah_fkey" FOREIGN KEY ("idSekolah") REFERENCES "Sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idSemester_fkey" FOREIGN KEY ("idSemester") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapor" ADD CONSTRAINT "Rapor_idMurid_fkey" FOREIGN KEY ("idMurid") REFERENCES "Murid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
