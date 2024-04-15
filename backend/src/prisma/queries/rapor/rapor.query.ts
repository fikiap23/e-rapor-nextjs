import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateRaporDto } from '../../../rapor/dto/create-rapor.dto';
import { UpdateRaporDto } from '../../../rapor/dto/update-rapor.dto';
import { SemesterType } from '@prisma/client';

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

    async create(idSekolah: string, idRombel: string, idGuru: string, payload: CreateRaporDto) {
        const rombelSemesterGuruId = await this.prisma.rombelSemesterGuru.findFirstOrThrow({ where: { idRombel, idGuru, idSemester: payload.idSemester } })
        return await this.prisma.rapor.create({ data: { ...payload, idSekolah, idRombel, idGuru, idRombelSemesterGuru: rombelSemesterGuruId.id } })
    }

    async updateById(id: string, payload: UpdateRaporDto) {
        return await this.prisma.rapor.update({ where: { id }, data: payload })
    }

    async printById(id: string) {
        const result = await this.prisma.rapor.findUnique({ where: { id }, include: { murid: true, semester: true, guru: true, sekolah: true, rombel: { include: { kategoriRombel: true } } } })
        if (!result) return null
        return {
            semester: `Semester ${result.semester.jenisSemester === SemesterType.GANJIL ? '1' : '2'} Tahun Pelajaran ${result.semester.tahunAjaranAwal}/${result.semester.tahunAjaranAkhir}`,
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