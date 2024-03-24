import { Injectable } from '@nestjs/common';
import { NilaiMingguanRepository } from './nilai-mingguan.repository';
import { CreatePenilaianMingguanDto } from './dto/create-nilai-mingguan.dto';
import { UpdatePenilaianMingguanDto } from './dto/update-nilai-mingguan.dto';

@Injectable()
export class NilaiMingguanService {
    constructor(private readonly nilaiMingguanRepository: NilaiMingguanRepository) { }

    async findAll() {
        return await this.nilaiMingguanRepository.findAll();
    }

    async findOne(id: string) {
        return await this.nilaiMingguanRepository.findByIdOrThrow(id);
    }

    async create(token: string, dto: CreatePenilaianMingguanDto) {
        return await this.nilaiMingguanRepository.create(token, dto);
    }

    async updateById(token: string, id: string, dto: UpdatePenilaianMingguanDto) {
        return await this.nilaiMingguanRepository.updateById(token, id, dto);
    }

    async deleteById(token: string, id: string) {
        return await this.nilaiMingguanRepository.deleteById(token, id);
    }
}