import { Injectable } from '@nestjs/common';
import { RombelRepository } from './rombel.repository';
import { CreateRombelDto } from './dto/create-rombel.dto';
import { CreateKategoriRombelDto } from './dto/create-kategori-rombel.dto';
import { UpdatKategoriRombelDto } from './dto/update-kategori-rombel.dto';
import { UpdateRombelDto } from './dto/update-rombel.dto';
import { UpdateRombelSemesterGuruDto } from './dto/update-rombel-semester-guru.dto';

@Injectable()
export class RombelService {
    constructor(private readonly rombelRepository: RombelRepository) { }

    async createRombel(dto: CreateRombelDto) {
        return await this.rombelRepository.createRombel(dto)
    }

    async findAllRombel() {
        return await this.rombelRepository.findAllRombel()
    }

    async findOneRombel(id: string) {
        return await this.rombelRepository.findRombelByIdOrThrow(id)
    }

    async updateRombel(id: string, dto: UpdateRombelDto) {
        return await this.rombelRepository.updateRombelById(id, dto)
    }

    async deleteRombelById(id: string) {
        return await this.rombelRepository.deleteRombelById(id)
    }

    async findAllWithGuru() {
        return await this.rombelRepository.findAllWithGuru()
    }

    async findAllRombelGuruNoRelation() {
        return await this.rombelRepository.findAllRombelGuruNoRelation()
    }

    async createRombelSemesterGuru(payload: UpdateRombelSemesterGuruDto) {
        return await this.rombelRepository.createRombelSemesterGuru(payload)
    }

    async updateRombelSemesterGuruById(id: string, payload: UpdateRombelSemesterGuruDto) {
        return await this.rombelRepository.updateRombelSemesterGuruById(id, payload)
    }

    async deleteRombelSemesterGuruById(id: string) {
        return await this.rombelRepository.deleteRombelSemesterGuruById(id)
    }

    /*
    |--------------------------------------------------------------------------
    | Kategori Rombel Service
    |--------------------------------------------------------------------------
    */
    async createKategoriRombel(dto: CreateKategoriRombelDto) {
        return await this.rombelRepository.createKategoriRombel(dto)
    }

    async updateKategoriRombel(id: string, dto: UpdatKategoriRombelDto) {
        return await this.rombelRepository.updateKategoriRombel(id, dto)
    }

    async findAllKategoriRombel() {
        return await this.rombelRepository.findAllKategoriRombel()
    }

    async findOneKategoriRombel(id: string) {
        return await this.rombelRepository.findKategoriRombelOrThrowById(id)
    }

    async deleteKategoriRombel(id: string) {
        return await this.rombelRepository.delecteKategoriRombel(id)
    }
}