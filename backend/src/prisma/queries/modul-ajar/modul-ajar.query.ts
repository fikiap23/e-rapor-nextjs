import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import CreateModulAjarDto from '../../../modul-ajar/dto/create-modul-ajar.dto';
import { UpdateModulAjarDto } from '../../../modul-ajar/dto/update-modul-ajar.dto';

@Injectable()
export class ModulAjarQuery extends DbService {
    async findAll() {
        return await this.prisma.modulAjar.findMany()
    }

    async findById(id: string) {
        return await this.prisma.modulAjar.findUnique({ where: { id } })
    }

    async findByIdAndRombel(id: string, idRombelSemesterGuru: string) {
        return await this.prisma.modulAjar.findUnique({ where: { id, idRombelSemesterGuru } })
    }

    async findByIdRombel(idRombelSemesterGuru: string) {
        const modulAjar = await this.prisma.modulAjar.findMany({ where: { idRombelSemesterGuru }, include: { tujuanPembelajaran: true }, orderBy: { minggu: 'asc' } })
        return modulAjar
    }

    async checkIsMingguHasUsed(minggu: number, idTujuanPembelajaran: string, idRombelSemesterGuru: string): Promise<boolean> {
        const isMingguHasUsed = await this.prisma.modulAjar.findFirst({ where: { minggu, idTujuanPembelajaran, idRombelSemesterGuru } })
        return isMingguHasUsed ? true : false
    }

    async checkIsMingguHasUsedByIdsRombelSemesterGuru(minggu: number, idTujuanPembelajaran: string, idRombelSemesterGuru: string[]): Promise<boolean> {
        const isMingguHasUsed = await this.prisma.modulAjar.findFirst({ where: { minggu, idTujuanPembelajaran, idRombelSemesterGuru: { in: idRombelSemesterGuru } } })
        return isMingguHasUsed ? true : false
    }

    async create(payload: CreateModulAjarDto) {
        return await this.prisma.modulAjar.create({ data: payload })
    }

    async updateById(id: string, payload: UpdateModulAjarDto) {
        return await this.prisma.modulAjar.update({ where: { id }, data: payload })
    }

    async deleteById(id: string) {
        return await this.prisma.modulAjar.delete({ where: { id } })
    }
}