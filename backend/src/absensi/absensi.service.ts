import { Injectable } from '@nestjs/common';
import { AbsensiRepository } from './absensi.repository';
import { CreateAbsensiDto } from './dto/create-absensi.dto';
import { BulkAbsensiByJadwalDto } from './dto/bulk-absensi-by-jadwal.dto';

@Injectable()
export class AbsensiService {
    constructor(private readonly absensiRepository: AbsensiRepository) { }

    async findAll() {
        return await this.absensiRepository.findAll()
    }

    async findManyByIdMurid(idMurid: string) {
        return await this.absensiRepository.findManyByIdMurid(idMurid)
    }

    async findByIdOrThrow(id: string) {
        return await this.absensiRepository.findByIdOrThrow(id)
    }

    async findByIdMuridAndIdJadwalAjarOrThrow(idMurid: string, idJadwalAjar: string) {
        return await this.absensiRepository.findByIdMuridAndIdJadwalAjarOrThrow(idMurid, idJadwalAjar)
    }

    async create(token: string, dto: CreateAbsensiDto) {
        return await this.absensiRepository.create(token, dto)
    }

    async createMany(token: string, idJadwalAjar: string, dto: BulkAbsensiByJadwalDto[]) {
        return await this.absensiRepository.createManyByJadwal(token, idJadwalAjar, dto)
    }
}