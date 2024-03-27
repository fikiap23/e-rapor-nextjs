import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateRaporDto } from '../../../rapor/dto/create-rapor.dto';
import { UpdateRaporDto } from '../../../rapor/dto/update-rapor.dto';

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
        return await this.prisma.rapor.findMany({
            where: { idMurid, idSemester }, select: {
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
                totalAlpa: true,
                totalIzin: true,
                totalSakit: true,
            }
        })
    }

    async create(idSekolah: string, idRombel: string, idGuru: string, payload: CreateRaporDto) {
        return await this.prisma.rapor.create({ data: { ...payload, idSekolah, idRombel, idGuru } })
    }

    async updateById(id: string, payload: UpdateRaporDto) {
        return await this.prisma.rapor.update({ where: { id }, data: payload })
    }
}