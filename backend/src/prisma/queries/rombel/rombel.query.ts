import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateRombelDto } from '../../../rombel/dto/create-rombel.dto';
import { CreateKategoriRombelDto } from '../../../rombel/dto/create-kategori-rombel.dto';
import { UpdatKategoriRombelDto } from '../../../rombel/dto/update-kategori-rombel.dto';
import { UpdateRombelDto } from '../../../rombel/dto/update-rombel.dto';



@Injectable()
export class RombelQuery extends DbService {

    async create(payload: CreateRombelDto) {
        return await this.prisma.rombel.create({ data: payload })
    }

    async findAllRombel() {
        return await this.prisma.rombel.findMany({
            include: {
                kategoriRombel: true
            }
        })
    }

    async findRombelByTingkatanAndIdKategoriRombel(idKategoriRombel: string, tingkatan: number) {
        return await this.prisma.rombel.findMany({
            where: {
                tingkatan,
                idKategoriRombel: idKategoriRombel
            }
        })
    }

    async findRombelById(id: string) {
        return await this.prisma.rombel.findUnique({ where: { id } })
    }

    async updateRombelById(id: string, payload: UpdateRombelDto) {
        return await this.prisma.rombel.update({ where: { id }, data: payload })
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
}