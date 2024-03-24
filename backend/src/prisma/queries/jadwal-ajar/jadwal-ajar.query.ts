import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateJadwalAjarDto } from '../../../jadwal-ajar/dto/create-jadwal-ajar.dto';
import { HariType } from '@prisma/client';
import { UpdateJadwalAjarDto } from '../../../jadwal-ajar/dto/update-jadwal-ajar.dto';

@Injectable()
export class JadwalAjarQuery extends DbService {

    async findAll() {
        return await this.prisma.jadwalAjar.findMany()
    }

    async findById(id: string) {
        return await this.prisma.jadwalAjar.findUnique({ where: { id } })
    }

    async findByIdModulAjar(idModulAjar: string) {
        return await this.prisma.jadwalAjar.findMany({ where: { idModulAjar } })
    }

    async checkIsHariHasUsed(idModulAjar: string, hari: HariType): Promise<boolean> {
        const isHariHasUsed = await this.prisma.jadwalAjar.findFirst({ where: { idModulAjar, hari } })
        return isHariHasUsed ? true : false
    }

    async create(idRombel: string, payload: CreateJadwalAjarDto) {
        return await this.prisma.jadwalAjar.create({ data: { ...payload, idRombel } })
    }

    async updateById(id: string, payload: UpdateJadwalAjarDto) {
        return await this.prisma.jadwalAjar.update({ where: { id }, data: payload })
    }

    async deleteById(id: string) {
        return await this.prisma.jadwalAjar.delete({ where: { id } })
    }
}