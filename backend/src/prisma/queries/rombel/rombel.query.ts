import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateRombelDto } from '../../../rombel/dto/create-rombel.dto';
import { CreateKategoriRombelDto } from '../../../rombel/dto/create-kategori-rombel.dto';
import { UpdatKategoriRombelDto } from '../../../rombel/dto/update-kategori-rombel.dto';
import { UpdateRombelDto } from '../../../rombel/dto/update-rombel.dto';
import { UpdateRombelSemesterGuruDto } from '../../../rombel/dto/update-rombel-semester-guru.dto';



@Injectable()
export class RombelQuery extends DbService {

    async create(payload: CreateRombelDto) {
        const rombel = await this.prisma.rombel.create({ data: payload })
        return await this.findRombelById(rombel.id)
    }

    async findAllRombel() {
        const rombels = await this.prisma.rombel.findMany({
            include: {
                kategoriRombel: true,
                murid: true
            }
        })

        return rombels.map(rombel => {
            return {
                id: rombel.id,
                name: rombel.name,
                kuota: rombel.kuota,
                coutMurid: rombel.murid.length,
                isFull: rombel.isFull,
                idKategoriRombel: rombel.idKategoriRombel,
                kelompokUsia: rombel.kategoriRombel.kelompokUsia,
                kodeKelompokUsia: rombel.kategoriRombel.kode,
                murid: rombel.murid
            }
        })
    }

    async findRombelByNameAndIdKategoriRombel(idKategoriRombel: string, name: string) {
        return await this.prisma.rombel.findMany({
            where: {
                name,
                idKategoriRombel: idKategoriRombel
            }
        })
    }

    async findRombelById(id: string) {
        const rombel = await this.prisma.rombel.findUnique({
            where: { id },
            include: {
                kategoriRombel: true,
                murid: true
            }
        })
        if (!rombel) return null
        return {
            id: rombel.id,
            name: rombel.name,
            kuota: rombel.kuota,
            isFull: rombel.isFull,
            coutMurid: rombel.murid.length,
            idKategoriRombel: rombel.idKategoriRombel,
            kelompokUsia: rombel.kategoriRombel.kelompokUsia,
            kodeKelompokUsia: rombel.kategoriRombel.kode,
            murid: rombel.murid
        }
    }


    async updateRombelById(id: string, payload: UpdateRombelDto) {
        return await this.prisma.rombel.update({ where: { id }, data: payload })
    }

    async deleteRombelById(id: string) {
        return await this.prisma.rombel.delete({ where: { id } })
    }

    async findAllWithGuru() {
        const data = await this.prisma.rombelSemesterGuru.findMany({
            include: {
                rombel: true,
                guru: true,
                semester: true
            }
        })

        return data.map(data => {
            return {
                id: data.id,
                idRombel: data.idRombel,
                idGuru: data.idGuru,
                idSemester: data.idSemester,
                name: data.rombel.name,
                semester: `${data.semester.tahunAjaranAwal}-${data.semester.tahunAjaranAkhir} (${data.semester.jenisSemester})`,
                guru: data.guru
            }
        })
    }
    async findAllRombelGuruNoRelation() {
        const rombels = await this.prisma.rombel.findMany({
            // where: {
            //     idGuru: null
            // },
            orderBy: {
                name: 'asc'
            }
        })

        const gurus = await this.prisma.guru.findMany({
            // where: {
            //     rombel: {
            //         none: {}
            //     }
            // }
        })

        return {
            rombels,
            gurus
        }
    }

    async createRombelSemesterGuru(payload: UpdateRombelSemesterGuruDto) {
        return await this.prisma.rombelSemesterGuru.create({ data: payload })
    }

    async deleteRombelSemesterGuruById(id: string) {
        return await this.prisma.rombelSemesterGuru.delete({ where: { id } })
    }

    async updateRombelSemesterGuruById(id: string, payload: UpdateRombelSemesterGuruDto) {
        return await this.prisma.rombelSemesterGuru.update({ where: { id }, data: payload })
    }

    async findRombelSemesterGuruByIdOrThrow(id: string) {
        const rombel = await this.prisma.rombelSemesterGuru.findUnique({ where: { id } })
        if (!rombel) throw new BadRequestException('Rombel tidak ditemukan')
        return await this.prisma.rombelSemesterGuru.findUnique({ where: { id } })
    }

    async findRombelSemesterGuruByIdsOrThrow(ids: string[]) {
        return await this.prisma.rombelSemesterGuru.findMany({ where: { id: { in: ids } } })
    }

    async checkIsRombelSemesterGuruExist(idRombel: string, idSemester: string, idGuru: string) {
        return await this.prisma.rombelSemesterGuru.findFirst({ where: { idRombel, idSemester, idGuru } })
    }

    async findRombelAndSemesterById(idRombelSemesterGuru: string) {
        const result = await this.prisma.rombelSemesterGuru.findUnique({
            where: { id: idRombelSemesterGuru }, include: {
                rombel: {
                    select: {
                        id: true,
                        name: true,
                        kategoriRombel: true
                    }
                }, semester: true
            }
        })
        if (!result) throw new BadRequestException('Rombel tidak ditemukan')
        return {
            id: result.id,
            idRombel: result.idRombel,
            idSemester: result.idSemester,
            idGuru: result.idGuru,
            name: result.rombel.name,
            semester: `${result.semester.tahunAjaranAwal}-${result.semester.tahunAjaranAkhir} (${result.semester.jenisSemester})`,
            rombel: result.rombel.name,
            kelompokUsia: result.rombel.kategoriRombel.kelompokUsia
        }

    }

    /*
    |--------------------------------------------------------------------------
    | Kategori Rombel Query
    |--------------------------------------------------------------------------
    */

    async findKategoriRombelByKode(kode: string) {
        return await this.prisma.kategoriRombel.findUnique({ where: { kode } })
    }

    async findKategoriRombelById(id: string) {
        return await this.prisma.kategoriRombel.findUnique({ where: { id } })
    }

    async createKategoriRombel(payload: CreateKategoriRombelDto) {
        return await this.prisma.kategoriRombel.create({ data: payload })
    }

    async updateKategoriRombel(id: string, payload: UpdatKategoriRombelDto) {
        return await this.prisma.kategoriRombel.update({ where: { id }, data: payload })
    }

    async findAllKategoriRombel() {
        return await this.prisma.kategoriRombel.findMany()
    }

    async deleteKategoriRombelById(id: string) {
        return await this.prisma.kategoriRombel.delete({ where: { id } })
    }
}