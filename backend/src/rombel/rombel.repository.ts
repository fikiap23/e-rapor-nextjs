import { BadRequestException, Injectable } from '@nestjs/common';
import { RombelQuery } from '../prisma/queries/rombel/rombel.query';
import { CreateRombelDto } from './dto/create-rombel.dto';
import { GuruRepository } from '../guru/guru.repository';
import { CreateKategoriRombelDto } from './dto/create-kategori-rombel.dto';
import { UpdatKategoriRombelDto } from './dto/update-kategori-rombel.dto';
import { UpdateRombelDto } from './dto/update-rombel.dto';
import { UpdateRombelSemesterGuruDto } from './dto/update-rombel-semester-guru.dto';

@Injectable()
export class RombelRepository {
    constructor(private readonly rombelQuery: RombelQuery, private readonly guruRepository: GuruRepository) { }

    async createRombel(dto: CreateRombelDto) {
        // check name and name rombel exist
        const rombel = await this.rombelQuery.findRombelByNameAndIdKategoriRombel(dto.idKategoriRombel, dto.name);
        if (rombel.length > 0) throw new BadRequestException('Rombel sudah ada');
        await this.findKategoriRombelOrThrowById(dto.idKategoriRombel)
        return await this.rombelQuery.create(dto)
    }

    async findAllRombel() {
        return await this.rombelQuery.findAllRombel()
    }

    async findRombelByIdOrThrow(id: string) {
        const rombel = await this.rombelQuery.findRombelById(id);
        if (!rombel) throw new BadRequestException('Rombel tidak ditemukan');
        return rombel
    }

    async updateRombelById(id: string, dto: UpdateRombelDto) {
        // check rombel exist
        const existRombel = await this.findRombelByIdOrThrow(id);

        // check name and name rombel exist
        if (dto.name && dto.name !== existRombel.name) {
            const rombel = await this.rombelQuery.findRombelByNameAndIdKategoriRombel(dto.idKategoriRombel, dto.name);
            if (rombel.length > 0) throw new BadRequestException('Rombel sudah ada');
        }
        return await this.rombelQuery.updateRombelById(id, dto)
    }

    async deleteRombelById(id: string) {
        try {
            // check rombel exist
            await this.findRombelByIdOrThrow(id);
            return await this.rombelQuery.deleteRombelById(id)
        } catch (error) {
            throw new BadRequestException("Gagal menghapus Rombel, Rombel masih digunakan dalam Sistem");
        }
    }

    async findAllWithGuru() {
        return await this.rombelQuery.findAllWithGuru()
    }

    async findAllRombelGuruNoRelation() {
        return await this.rombelQuery.findAllRombelGuruNoRelation()
    }

    async checkRombelSemesterGuruExist(idRombel: string, idGuru: string, idSemester: string) {
        const rombel = await this.rombelQuery.checkIsRombelSemesterGuruExist(idRombel, idSemester, idGuru)
        if (rombel) throw new BadRequestException('Data sudah ada');
        return
    }

    async checkRombelSemester(idRombel: string, idSemester: string) {
        const rombel = await this.rombelQuery.checkRombelSemester(idRombel, idSemester)
        if (rombel) throw new BadRequestException('Sudah ada guru di rombel dan semester ini');
        return
    }

    async createRombelSemesterGuru(payload: UpdateRombelSemesterGuruDto) {
        // check rombel exist
        await this.checkRombelSemester(payload.idRombel, payload.idSemester)
        return await this.rombelQuery.createRombelSemesterGuru(payload)
    }

    async updateRombelSemesterGuruById(id: string, payload: UpdateRombelSemesterGuruDto) {
        // find rombelSemesterGuru
        const rombelSemesterGuru = await this.rombelQuery.findRombelSemesterGuruByIdOrThrow(id)
        if (payload.idGuru !== rombelSemesterGuru.idGuru || payload.idSemester !== rombelSemesterGuru.idSemester || payload.idRombel !== rombelSemesterGuru.idRombel) {
            await this.checkRombelSemesterGuruExist(payload.idRombel, payload.idGuru, payload.idSemester)
        }
        return await this.rombelQuery.updateRombelSemesterGuruById(id, payload)
    }

    async deleteRombelSemesterGuruById(id: string) {
        return await this.rombelQuery.deleteRombelSemesterGuruById(id)
    }

    /*
    |--------------------------------------------------------------------------
    | Kategori Rombel FUNCTIONS
    |--------------------------------------------------------------------------
    */

    async findKategoriRombelOrThrowByKode(kode: string) {
        const rombel = await this.rombelQuery.findKategoriRombelByKode(kode);
        if (!rombel) throw new BadRequestException('Kategori Rombel tidak ditemukan');
        return rombel
    }

    async checkKategoriRombelExistByKode(kode: string) {
        const rombel = await this.rombelQuery.findKategoriRombelByKode(kode);
        if (rombel) throw new BadRequestException('Kode Kategori Rombel sudah ada');
        return
    }

    async findKategoriRombelOrThrowById(id: string) {
        const rombel = await this.rombelQuery.findKategoriRombelById(id);
        if (!rombel) throw new BadRequestException('Kategori Rombel tidak ditemukan');
        return rombel
    }

    async checkKategoriRombelExistById(id: string) {
        const rombel = await this.rombelQuery.findKategoriRombelById(id);
        if (rombel) throw new BadRequestException('Id Kategori Rombel sudah ada');
        return
    }

    async createKategoriRombel(dto: CreateKategoriRombelDto) {
        // check kategori rombel exist
        await this.checkKategoriRombelExistByKode(dto.kode);
        return await this.rombelQuery.createKategoriRombel(dto)
    }

    async updateKategoriRombel(id: string, dto: UpdatKategoriRombelDto) {
        // check kategori rombel exist
        const kategori = await this.findKategoriRombelOrThrowById(id);
        if (dto.kode && dto.kode !== kategori.kode) await this.checkKategoriRombelExistByKode(dto.kode);
        return await this.rombelQuery.updateKategoriRombel(id, dto)
    }

    async findAllKategoriRombel() {
        return await this.rombelQuery.findAllKategoriRombel()
    }

    async delecteKategoriRombel(id: string) {
        try {
            // check kategori rombel exist
            await this.findKategoriRombelOrThrowById(id);
            return await this.rombelQuery.deleteKategoriRombelById(id)
        } catch (error) {
            throw new BadRequestException("Gagal menghapus Kategori Kelompok Usia masih digunakan dalam Rombel");
        }
    }
}