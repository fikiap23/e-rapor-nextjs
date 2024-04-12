import { Injectable } from '@nestjs/common';
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
}