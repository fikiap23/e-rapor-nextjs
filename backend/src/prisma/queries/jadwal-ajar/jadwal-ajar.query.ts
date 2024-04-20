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
                modulAjar: {
                    minggu: 'asc'
                }
            }
        })

        const tanggalHari = ['tanggalHari1', 'tanggalHari2', 'tanggalHari3', 'tanggalHari4', 'tanggalHari5', 'tanggalHari6'];
        const kegiatanIntiHari = ['kegiatanIntiHari1', 'kegiatanIntiHari2', 'kegiatanIntiHari3', 'kegiatanIntiHari4', 'kegiatanIntiHari5', 'kegiatanIntiHari6'];
        return result.map(x => {

            const formatedJadwal = tanggalHari.map((tanggal, index) => ({
                id: x.id,
                tanggal: x[tanggal],
                kegiatanInti: x[kegiatanIntiHari[index]],
                idModulAjar: x.idModulAjar,
                idRombelSemesterGuru: x.idRombelSemesterGuru
            }));

            return {
                ...x,
                formatedJadwal,
                minggu: x.modulAjar.minggu,
                tanggalMulai: x.tanggalHari1,
                topik: x.modulAjar.topik,
                subtopik: x.modulAjar.subtopik
            }
        })
    }

    async findById(id: string) {
        return await this.prisma.jadwalAjar.findUnique({ where: { id } })
    }

    async findByIdModulAjar(idModulAjar: string) {
        return await this.prisma.jadwalAjar.findFirst({ where: { idModulAjar } })
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

    async findByIdAndIdModulAjar(id: string, idModulAjar: string) {
        return await this.prisma.jadwalAjar.findFirst({ where: { id, idModulAjar } })
    }
}