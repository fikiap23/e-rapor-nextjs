import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreatePenilaianMingguanDto } from '../../../nilai-mingguan/dto/create-nilai-mingguan.dto';
import { UpdatePenilaianMingguanDto } from '../../../nilai-mingguan/dto/update-nilai-mingguan.dto';

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

    async findStudentByIdRombelSemesterGuru(idRombelSemesterGuru: string, idTujuanPembelajaran: string) {
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

        return originalData.rombel.murid.map(murid => {
            return {
                ...murid,
                penilaianMingguan: murid.penilaianMingguan[0] || null
            }
        })
    }
}