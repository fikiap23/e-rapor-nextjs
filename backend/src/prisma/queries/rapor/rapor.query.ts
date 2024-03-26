import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateRaporDto } from '../../../rapor/dto/create-rapor.dto';

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

    async create(idSekolah: string, idRombel: string, idGuru: string, payload: CreateRaporDto) {
        return await this.prisma.rapor.create({ data: { ...payload, idSekolah, idRombel, idGuru } })
    }
}