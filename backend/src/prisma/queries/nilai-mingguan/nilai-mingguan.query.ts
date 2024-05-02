import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreatePenilaianMingguanDto } from '../../../nilai-mingguan/dto/create-nilai-mingguan.dto';
import { UpdatePenilaianMingguanDto } from '../../../nilai-mingguan/dto/update-nilai-mingguan.dto';
import { Prisma, SemesterType } from '@prisma/client';
import { CreateAnalisisPenilaianType } from './interfaces/analisisPenilaian';

@Injectable()
export class NilaiMingguanQuery extends DbService {

    async findAll() {
        return await this.prisma.penilaianMingguan.findMany()
    }

    async findById(id: string) {
        return await this.prisma.penilaianMingguan.findUnique({ where: { id } })
    }

    async findByIdAndIdTpAndIdMurid(id: string, idTujuanPembelajaran: string, idMurid: string) {
        return await this.prisma.penilaianMingguan.findUnique({ where: { id, idTujuanPembelajaran, idMurid } })
    }

    async findByIdWithTp(id: string) {
        return await this.prisma.penilaianMingguan.findUnique({ where: { id }, include: { tujuanPembelajaran: true } })
    }

    async findByIdMurid(id: string) {
        return await this.prisma.penilaianMingguan.findMany({ where: { idMurid: id } })
    }

    async create(payload: CreatePenilaianMingguanDto) {
        return await this.prisma.penilaianMingguan.create({ data: payload })
    }

    async updateById(id: string, payload: UpdatePenilaianMingguanDto) {
        const penilaianMingguan = await this.prisma.penilaianMingguan.update({ where: { id }, data: payload })
        const rapor = await this.prisma.rapor.findFirst({ where: { idMurid: penilaianMingguan.idMurid, idRombelSemesterGuru: penilaianMingguan.idRombelSemesterGuru } })
        if (rapor && rapor.isValidated) {
            throw new BadRequestException('Tidak Bisa Mengubah Penilaian Yang Telah Tervalidasi')
        }
        // reset rapor
        await this.deleteRaporByIdMuridAndIdRombelSemesterGuru(penilaianMingguan.idMurid, penilaianMingguan.idRombelSemesterGuru)
        return penilaianMingguan
    }

    async deleteById(id: string) {
        const penilaianMingguan = await this.prisma.penilaianMingguan.findUnique({ where: { id } })
        if (!penilaianMingguan) {
            throw new BadRequestException('Penilaian mingguan Tidak ditemukan')
        }
        const rapor = await this.prisma.rapor.findFirst({ where: { idMurid: penilaianMingguan.idMurid, idRombelSemesterGuru: penilaianMingguan.idRombelSemesterGuru } })
        if (rapor && rapor.isValidated) {
            throw new BadRequestException('Tidak Bisa Menghapus Penilaian Yang Telah Tervalidasi')
        }
        // reset rapor
        await this.deleteRaporByIdMuridAndIdRombelSemesterGuru(penilaianMingguan.idMurid, penilaianMingguan.idRombelSemesterGuru)
        return await this.prisma.penilaianMingguan.delete({ where: { id } })
    }

    async deleteRaporByIdMuridAndIdRombelSemesterGuru(idMurid: string, idRombelSemesterGuru: string) {
        // check rapor exist
        const rapor = await this.prisma.rapor.findFirst({ where: { idMurid, idRombelSemesterGuru } })
        if (rapor) {
            await this.prisma.rapor.deleteMany({ where: { idMurid, idRombelSemesterGuru } })
        }
        return
    }

    async findRaporByIdMuridAndIdRombelSemesterGuru(idMurid: string, idRombelSemesterGuru: string) {
        return await this.prisma.rapor.findFirst({ where: { idMurid, idRombelSemesterGuru } })
    }

    async findStudentByIdRombelSemesterGuruAndIdTp(idRombelSemesterGuru: string, idTujuanPembelajaran: string) {
        const checkRombelSemesterGuru = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id: idRombelSemesterGuru
            }
        })
        if (!checkRombelSemesterGuru) {
            throw new BadRequestException('Rombel tidak ditemukan')
        }
        const originalData = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id: idRombelSemesterGuru
            },
            select: {
                rombel: {
                    select: {
                        id: true,
                        name: true,
                        murid: {
                            select: {
                                id: true,
                                nama: true,
                                nis: true,
                                penilaianMingguan: {
                                    where: {
                                        idRombelSemesterGuru: idRombelSemesterGuru,
                                        idTujuanPembelajaran: idTujuanPembelajaran
                                    },
                                    take: 1
                                }
                            },
                            orderBy: {
                                nis: 'asc'
                            }
                        }
                    }
                },
                semester: {
                    select: {
                        id: true,
                        tahunAjaranAwal: true,
                        tahunAjaranAkhir: true,
                        jenisSemester: true,
                    }
                },
            }

        })

        return originalData.rombel?.murid.map(murid => {
            return {
                ...murid,
                penilaianMingguan: murid.penilaianMingguan[0] || null
            }
        })
    }

    async printPenilaianByIdRombelSemesterGuruAndIdTp(idRombelSemesterGuru: string, idTujuanPembelajaran: string) {
        const checkRombelSemesterGuru = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id: idRombelSemesterGuru
            },
            select: {
                semester: true,
                rombel: {
                    select: {
                        name: true,
                        kategoriRombel: true
                    }
                },
                guru: {
                    select: {
                        nama: true,
                        nip: true
                    }
                }
            }
        })
        if (!checkRombelSemesterGuru) {
            return null
        }
        const checkTp = await this.prisma.tujuanPembelajaran.findUnique({
            where: {
                id: idTujuanPembelajaran
            }
        })
        if (!checkTp) {
            return null
        }
        const sekolah = await this.prisma.sekolah.findFirst(
            {
                select: {
                    nama: true
                }
            }
        )
        const murids = await this.findStudentByIdRombelSemesterGuruAndIdTp(idRombelSemesterGuru, idTujuanPembelajaran)

        return {
            namaSekolah: sekolah?.nama || 'Belum ada sekolah',
            namaRombel: checkRombelSemesterGuru.rombel.name,
            kelompokUsia: checkRombelSemesterGuru.rombel.kategoriRombel.kelompokUsia,
            semester: `Semester ${checkRombelSemesterGuru.semester.jenisSemester === SemesterType.GANJIL ? '1' : '2'} Tahun Pelajaran ${checkRombelSemesterGuru.semester.tahunAjaranAwal}/${checkRombelSemesterGuru.semester.tahunAjaranAkhir}`,
            namaGuru: checkRombelSemesterGuru.guru.nama,
            nipGuru: checkRombelSemesterGuru.guru.nip,
            namaKapsek: checkRombelSemesterGuru.semester.namaKepsek,
            nipKapsek: checkRombelSemesterGuru.semester.nipKepsek,
            tp: checkTp,
            murids: murids

        }
    }

    async printPenilaianByIdRombelSemesterGuruAndIdMurid(idRombelSemesterGuru: string, idMurid: string) {
        const checkRombelSemesterGuru = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id: idRombelSemesterGuru
            },
            select: {
                semester: true,
                rombel: {
                    select: {
                        name: true,
                        kategoriRombel: true
                    }
                },
                guru: {
                    select: {
                        nama: true,
                        nip: true
                    }
                }
            }
        })
        if (!checkRombelSemesterGuru) {
            return null
        }

        const sekolah = await this.prisma.sekolah.findFirst(
            {
                select: {
                    nama: true
                }
            }
        )

        const muridWithPenilaian = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id: idRombelSemesterGuru
            },
            select: {
                rombel: {
                    select: {
                        murid: {
                            where: {
                                id: idMurid
                            },
                            select: {
                                id: true,
                                nama: true,
                                nis: true,
                                penilaianMingguan: {
                                    include: {
                                        tujuanPembelajaran: {
                                            select: {
                                                minggu: true
                                            }
                                        }
                                    },
                                    orderBy: {
                                        tujuanPembelajaran: {
                                            minggu: 'asc'
                                        }
                                    }
                                },
                            }
                        }
                    }
                },
            }
        })

        if (!muridWithPenilaian.rombel.murid[0]) {
            return null
        }

        const penilaianMingguan = muridWithPenilaian.rombel.murid[0].penilaianMingguan.map(penilaian => {
            return {
                ...penilaian,
                minggu: penilaian.tujuanPembelajaran.minggu
            }
        })

        return {
            namaSekolah: sekolah?.nama || 'Belum ada sekolah',
            namaRombel: checkRombelSemesterGuru.rombel.name,
            kelompokUsia: checkRombelSemesterGuru.rombel.kategoriRombel.kelompokUsia,
            semester: `Semester ${checkRombelSemesterGuru.semester.jenisSemester === SemesterType.GANJIL ? '1' : '2'} Tahun Pelajaran ${checkRombelSemesterGuru.semester.tahunAjaranAwal}/${checkRombelSemesterGuru.semester.tahunAjaranAkhir}`,
            namaGuru: checkRombelSemesterGuru.guru.nama,
            nipGuru: checkRombelSemesterGuru.guru.nip,
            namaKapsek: checkRombelSemesterGuru.semester.namaKepsek,
            nipKapsek: checkRombelSemesterGuru.semester.nipKepsek,
            murid: {
                id: muridWithPenilaian.rombel.murid[0].id,
                nama: muridWithPenilaian.rombel.murid[0].nama,
                nis: muridWithPenilaian.rombel.murid[0].nis,
            },
            penilaian: penilaianMingguan
        }
    }

    async createStaticAnalisisPenilaian(payload: CreateAnalisisPenilaianType) {
        const penilaian = payload.penilaian as unknown as Prisma.JsonArray
        delete payload.penilaian
        const checkIsStaticAnalisisPenilaianExist = await this.checkIsStaticAnalisisPenilaianExist(payload.idRombelSemesterGuru, payload.idMurid)
        const tp = await this.prisma.tujuanPembelajaran.count()
        if (penilaian.length < tp) {
            throw new BadRequestException('Penilaian Belum Lengkap')
        }
        if (checkIsStaticAnalisisPenilaianExist) {
            return await this.prisma.analisisPenilaian.update({
                where: {
                    id: checkIsStaticAnalisisPenilaianExist.id
                },
                data: {
                    ...payload,
                    penilaian
                }
            })
        }
        return await this.prisma.analisisPenilaian.create({
            data: {
                ...payload,
                penilaian
            }
        })
    }

    async findStaticAnalisisPenilaianByIdRombelSemesterGuru(idRombelSemesterGuru: string) {
        return await this.prisma.analisisPenilaian.findMany({
            where: {
                idRombelSemesterGuru
            }
        })
    }

    async checkIsStaticAnalisisPenilaianExist(idRombelSemesterGuru: string, idMurid: string) {
        return await this.prisma.analisisPenilaian.findFirst({
            where: {
                idRombelSemesterGuru,
                idMurid
            }
        })
    }

    async printStaticAnalisisPenilaian(idRombelSemesterGuru: string, idMurid: string) {
        const analisisPenilaian = await this.checkIsStaticAnalisisPenilaianExist(idRombelSemesterGuru, idMurid)
        if (!analisisPenilaian) {
            return this.printPenilaianByIdRombelSemesterGuruAndIdMurid(idRombelSemesterGuru, idMurid)
        }

        return {
            ...analisisPenilaian,
            murid: {
                nama: analisisPenilaian.nama,
                nis: analisisPenilaian.nis,
            }
        }
    }
}