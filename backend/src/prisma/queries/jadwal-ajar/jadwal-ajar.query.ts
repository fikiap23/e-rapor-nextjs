import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateJadwalAjarDto } from '../../../jadwal-ajar/dto/create-jadwal-ajar.dto';
import { UpdateJadwalAjarDto } from '../../../jadwal-ajar/dto/update-jadwal-ajar.dto';

@Injectable()
export class JadwalAjarQuery extends DbService {

    async findAll(idRombelSemesterGuru: string) {
        const result = await this.prisma.jadwalAjar.findMany({
            where: { idRombelSemesterGuru }, include: {
                modulAjar: {
                    select: {
                        minggu: true,
                        topik: true,
                        subtopik: true,
                    }
                }
            },
            orderBy: {
                tanggal: 'asc'
            }
        })
        const days: string[] = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        return result.map(item => {
            const date = new Date(item.tanggal)
            const dayName = days[date.getDay()]
            return {
                id: item.id,
                idModulAjar: item.idModulAjar,
                minggu: item.modulAjar.minggu,
                hari: dayName,
                tanggal: item.tanggal,
                topik: item.modulAjar.topik,
                subtopik: item.modulAjar.subtopik,
                kegiatanInti: item.kegiatanInti
            }
        })
    }

    async findById(id: string) {
        return await this.prisma.jadwalAjar.findUnique({ where: { id } })
    }

    async findByIdModulAjar(idModulAjar: string) {
        return await this.prisma.jadwalAjar.findMany({ where: { idModulAjar } })
    }

    async create(idRombelSemesterGuru: string, payload: CreateJadwalAjarDto) {
        return await this.prisma.jadwalAjar.create({ data: { ...payload, idRombelSemesterGuru } })
    }

    async updateById(id: string, payload: UpdateJadwalAjarDto) {
        return await this.prisma.jadwalAjar.update({ where: { id }, data: payload })
    }

    async deleteById(id: string) {
        return await this.prisma.jadwalAjar.delete({ where: { id } })
    }

    async findByIds(ids: string[]) {
        return await this.prisma.jadwalAjar.findMany({ where: { id: { in: ids } } })
    }
}