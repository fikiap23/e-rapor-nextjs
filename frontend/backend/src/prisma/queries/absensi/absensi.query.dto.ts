import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateAbsensiDto } from '../../../absensi/dto/create-absensi.dto';
import { UpdateAbsensiDto } from '../../../absensi/dto/update-absensi.dto';
import { BulkAbsensiByJadwalDto } from '../../../absensi/dto/bulk-absensi-by-jadwal.dto';

@Injectable()
export class AbsensiQuery extends DbService {

    async findAll() {
        return await this.prisma.absensi.findMany();
    }

    async findById(id: string) {
        return await this.prisma.absensi.findUnique({ where: { id } })
    }

    async findByIdMurid(id: string) {
        return await this.prisma.absensi.findMany({ where: { idMurid: id } })
    }

    async findByIdMuridAndIdJadwal(idMurid: string, idJadwalAjar: string) {
        return await this.prisma.absensi.findMany({ where: { idMurid, idJadwalAjar } })
    }


    async checkIsAbsensiExist(idMurid: string, idJadwalAjar: string): Promise<boolean> {
        const data = await this.prisma.absensi.findMany({ where: { idMurid, idJadwalAjar } })
        return data.length > 0 ? true : false
    }

    async checkIsAbsensiExistByBulk(idsMurid: string[], idJadwalAjar: string): Promise<boolean> {
        const data = await this.prisma.absensi.findMany({ where: { idMurid: { in: idsMurid }, idJadwalAjar } })
        return data.length > 0 ? true : false
    }

    async create(payload: CreateAbsensiDto) {
        return await this.prisma.absensi.create({ data: payload })
    }

    async updateById(id: string, payload: UpdateAbsensiDto) {
        return await this.prisma.absensi.update({ where: { id }, data: payload })
    }

    async delete(id: string) {
        return await this.prisma.absensi.delete({ where: { id } })
    }

    async createMany(idJadwalAjar: string, payload: BulkAbsensiByJadwalDto[]) {
        // map idJadwalAjar
        return await this.prisma.absensi.createMany({ data: payload.map(item => ({ ...item, idJadwalAjar })) })
    }

    async updateMany(payload: UpdateAbsensiDto[]) {
        return await this.prisma.absensi.updateMany({ data: payload })
    }
}