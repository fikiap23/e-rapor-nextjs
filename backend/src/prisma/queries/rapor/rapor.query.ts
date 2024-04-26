import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateRaporDto } from '../../../rapor/dto/create-rapor.dto';
import { UpdateRaporDto } from '../../../rapor/dto/update-rapor.dto';
import { SemesterType } from '@prisma/client';
import { UpdateRaporStatic } from './interfaces/rapor';

@Injectable()
export class RaporQuery extends DbService {

    async findById(id: string) {
        return this.prisma.rapor.findUnique({
            where: {
                id
            }
        })
    }

    async findByIdMurid(idMurid: string) {
        return await this.prisma.rapor.findMany({
            where: { idMurid }, select: {
                id: true,
                catatanAgamaBudipekerti: true,
                catatanGuru: true,
                catatanJatiDiri: true,
                catatanLiterasiSains: true,
                catatanPancasila: true,
                catatanPertumbuhan: true,
                rombel: true,
                guru: true,
                sekolah: true,
                semester: true,
                totalAlpa: true,
                totalIzin: true,
                totalSakit: true,
            }
        })
    }

    async findByIdMuridAndSemester(idMurid: string, idSemester: string) {
        const result = await this.prisma.rapor.findFirst({
            where: { idMurid, idSemester }, select: {
                id: true,
                murid: true,
                rombel: {
                    include: {
                        kategoriRombel: true
                    }
                },
                semester: true
            }
        })

        if (!result) return null

        return {
            nama: result.murid.nama,
            nis: result.murid.nis,
            rombel: result.rombel.name,
            kelompokUsia: result.rombel.kategoriRombel.kelompokUsia,
            semester: `${result.semester.tahunAjaranAwal}/${result.semester.tahunAjaranAkhir} (${result.semester.jenisSemester})`,
            idRapor: result.id
        }
    }

    async findByNisNamaMuridAndSemester(nis: string, nama: string, idSemester: string) {
        const semester = await this.prisma.semester.findUnique({
            where: { id: idSemester }
        })
        if (!semester) throw new BadRequestException('Semester tidak ditemukan')

        const murid = await this.prisma.murid.findFirst({
            where: { nis },
        })

        // check if murid exists
        if (!murid) throw new BadRequestException('NIS tidak terdaftar')

        if (murid.nama.toLocaleLowerCase() !== nama.trim().toLocaleLowerCase()) throw new BadRequestException('Nama terdaftar bukan ' + nama)

        const result = await this.prisma.rapor.findFirst({
            where: { idMurid: murid.id, idSemester }, select: {
                id: true,
                murid: true,
                rombel: {
                    include: {
                        kategoriRombel: true
                    }
                },
                semester: true
            }
        })

        if (!result) throw new BadRequestException('Rapor tidak ditemukan')

        return {
            nama: result.murid.nama,
            nis: result.murid.nis,
            rombel: result.rombel.name,
            kelompokUsia: result.rombel.kategoriRombel.kelompokUsia,
            semester: `${result.semester.tahunAjaranAwal}/${result.semester.tahunAjaranAkhir} (${result.semester.jenisSemester})`,
            idRapor: result.id
        }
    }

    async findByIdRombelAndSemester(idRombel: string, idSemester: string) {
        const result = await this.prisma.murid.findMany({
            where: { idRombel }, include: {
                rapor: {
                    where: { idSemester },
                    include: {
                        guru: true,
                        sekolah: true,
                        semester: true,
                        rombel: {
                            include: {
                                kategoriRombel: true
                            }
                        }
                    }
                }
            }
        })

        return result
    }

    async create(idSekolah: string, idRombelSemesterGuru: string, payload: CreateRaporDto) {
        delete payload.idRombelSemesterGuru
        const rombelSemesterGuruId = await this.prisma.rombelSemesterGuru.findFirstOrThrow({ where: { id: idRombelSemesterGuru } })
        return await this.prisma.rapor.create({ data: { ...payload, idSekolah, idRombel: rombelSemesterGuruId.idRombel, idGuru: rombelSemesterGuruId.idGuru, idRombelSemesterGuru: rombelSemesterGuruId.id } })
    }

    async updateById(id: string, idRombelSemesterGuru: string, payload: UpdateRaporDto) {
        delete payload.idRombelSemesterGuru
        const rombelSemesterGuruId = await this.prisma.rombelSemesterGuru.findFirstOrThrow({ where: { id: idRombelSemesterGuru } })
        return await this.prisma.rapor.update({ where: { id }, data: { ...payload, idRombel: rombelSemesterGuruId.idRombel, idGuru: rombelSemesterGuruId.idGuru, idRombelSemesterGuru: rombelSemesterGuruId.id } })
    }

    async updateToStatic(id: string, payload: UpdateRaporStatic) {
        return await this.prisma.rapor.update({
            where: { id }, data: {
                ...payload,
                // idMurid: null,
                idGuru: null,
                idRombel: null,
                idSekolah: null,
                idSemester: null,
                isValidated: true
            }
        })
    }

    async printById(id: string) {
        const result = await this.prisma.rapor.findUnique({ where: { id }, include: { murid: true, semester: true, guru: true, sekolah: true, rombel: { include: { kategoriRombel: true } } } })
        if (!result) return null
        if (result.isValidated) {
            return {
                semester: result.namaSemester,
                semesterTahun: result.semesterTahun,
                sekolah: {
                    nama: result.namaSekolah,
                    npsn: result.npsnSekolah,
                    alamat: result.alamatSekolah,
                    kodePos: result.kodePosSekolah,
                    noTelepon: result.noTeleponSekolah,
                    provinsi: result.provinsiSekolah,
                    kota: result.kotaSekolah,
                    kecamatan: result.kecamatanSekolah,
                    kelurahan: result.kelurahanSekolah,
                    namaDisdik: result.namaDisdikSekolah,
                    logo: result.logoSekolah
                },
                murid: result.murid,
                guru: {
                    nama: result.namaGuru,
                    nip: result.nipGuru
                },
                rombel: {
                    nama: result.namaRombel,
                    kelompokUsia: result.kelompokUsia
                },
                kapsek: {
                    nama: result.namaKapsek,
                    nip: result.nipKapsek
                },
                rapor: {
                    id: result.id,
                    tanggalBagiRapor: result.tanggalBagiRapor,
                    catatanAgamaBudipekerti: result.catatanAgamaBudipekerti,
                    catatanGuru: result.catatanGuru,
                    catatanJatiDiri: result.catatanJatiDiri,
                    catatanLiterasiSains: result.catatanLiterasiSains,
                    catatanPancasila: result.catatanPancasila,
                    catatanPertumbuhan: result.catatanPertumbuhan,
                    totalAlpa: result.totalAlpa,
                    totalIzin: result.totalIzin,
                    totalSakit: result.totalSakit
                }
            }
        } else {
            return {
                semester: `Semester ${result.semester.jenisSemester === SemesterType.GANJIL ? '1' : '2'} Tahun Pelajaran ${result.semester.tahunAjaranAwal}/${result.semester.tahunAjaranAkhir}`,
                semesterTahun: `${result.semester.tahunAjaranAwal}/${result.semester.tahunAjaranAkhir} (${result.semester.jenisSemester})`,
                sekolah: result.sekolah,
                murid: result.murid,
                guru: result.guru,
                rombel: {
                    nama: result.rombel.name,
                    kelompokUsia: result.rombel.kategoriRombel.kelompokUsia
                },
                kapsek: {
                    nama: result.semester.namaKepsek,
                    nip: result.semester.nipKepsek
                },
                rapor: {
                    id: result.id,
                    tanggalBagiRapor: result.semester.tglBagiRapor,
                    catatanAgamaBudipekerti: result.catatanAgamaBudipekerti,
                    catatanGuru: result.catatanGuru,
                    catatanJatiDiri: result.catatanJatiDiri,
                    catatanLiterasiSains: result.catatanLiterasiSains,
                    catatanPancasila: result.catatanPancasila,
                    catatanPertumbuhan: result.catatanPertumbuhan,
                    totalAlpa: result.totalAlpa,
                    totalIzin: result.totalIzin,
                    totalSakit: result.totalSakit
                }
            }
        }
    }

}