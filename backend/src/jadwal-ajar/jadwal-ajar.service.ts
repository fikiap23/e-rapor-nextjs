import { Injectable } from '@nestjs/common';
import { JadwalAjarRepository } from './jadwal-ajar.repository';
import { CreateJadwalAjarDto } from './dto/create-jadwal-ajar.dto';
import { UpdateJadwalAjarDto } from './dto/update-jadwal-ajar.dto';

@Injectable()
export class JadwalAjarService {
    constructor(private readonly jadwalAjarRepository: JadwalAjarRepository) { }

    async findAll() {
        return await this.jadwalAjarRepository.findAll();
    }

    async findByIdOrThrow(id: string) {
        return await this.jadwalAjarRepository.findByIdOrThrow(id);
    }

    async findByIdModulAjar(idModulAjar: string) {
        return await this.jadwalAjarRepository.findByIdModulAjar(idModulAjar);
    }

    async createJadwalAjar(token: string, dto: CreateJadwalAjarDto) {
        return await this.jadwalAjarRepository.createJadwalAjar(token, dto);
    }

    async updateById(token: string, id: string, dto: UpdateJadwalAjarDto) {
        return await this.jadwalAjarRepository.updateById(token, id, dto);
    }

    async deleteById(token: string, id: string) {
        return await this.jadwalAjarRepository.deleteById(token, id);
    }
}