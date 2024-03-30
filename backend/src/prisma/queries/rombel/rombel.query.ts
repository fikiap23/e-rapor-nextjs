import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateRombelDto } from '../../../rombel/dto/create-rombel.dto';
import { CreateKategoriRombelDto } from '../../../rombel/dto/create-kategori-rombel.dto';
import { UpdatKategoriRombelDto } from '../../../rombel/dto/update-kategori-rombel.dto';
import { UpdateRombelDto } from '../../../rombel/dto/update-rombel.dto';



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