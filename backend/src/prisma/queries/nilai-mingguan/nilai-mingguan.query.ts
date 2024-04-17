import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreatePenilaianMingguanDto } from '../../../nilai-mingguan/dto/create-nilai-mingguan.dto';
import { UpdatePenilaianMingguanDto } from '../../../nilai-mingguan/dto/update-nilai-mingguan.dto';
import { SemesterType } from '@prisma/client';

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
        return await this.prisma.penilaianMingguan.update({ where: { id }, data: payload })
    }

    async deleteById(id: string) {
        return await this.prisma.penilaianMingguan.delete({ where: { id } })
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
            nameSekolah: sekolah?.nama || 'Belum ada sekolah',
            nameRombel: checkRombelSemesterGuru.rombel.name,
            kelompokUsia: checkRombelSemesterGuru.rombel.kategoriRombel.kelompokUsia,
            semester: `Semester ${checkRombelSemesterGuru.semester.jenisSemester === SemesterType.GANJIL ? '1' : '2'} Tahun Pelajaran ${checkRombelSemesterGuru.semester.tahunAjaranAwal}/${checkRombelSemesterGuru.semester.tahunAjaranAkhir}`,
            nameGuru: checkRombelSemesterGuru.guru.nama,
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
            nameSekolah: sekolah?.nama || 'Belum ada sekolah',
            nameRombel: checkRombelSemesterGuru.rombel.name,
            kelompokUsia: checkRombelSemesterGuru.rombel.kategoriRombel.kelompokUsia,
            semester: `Semester ${checkRombelSemesterGuru.semester.jenisSemester === SemesterType.GANJIL ? '1' : '2'} Tahun Pelajaran ${checkRombelSemesterGuru.semester.tahunAjaranAwal}/${checkRombelSemesterGuru.semester.tahunAjaranAkhir}`,
            nameGuru: checkRombelSemesterGuru.guru.nama,
            nipGuru: checkRombelSemesterGuru.guru.nip,
            namaKapsek: checkRombelSemesterGuru.semester.namaKepsek,
            nipKapsek: checkRombelSemesterGuru.semester.nipKepsek,
            murid: {
                id: muridWithPenilaian.rombel.murid[0].id,
                name: muridWithPenilaian.rombel.murid[0].nama,
                nis: muridWithPenilaian.rombel.murid[0].nis,
            },
            penilaian: penilaianMingguan
        }
    }
}