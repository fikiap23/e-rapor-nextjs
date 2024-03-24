import { Injectable } from '@nestjs/common';
import { MuridRepository } from './murid.repository';
import CreateMuridDto from './dto/create-murid.dto';
import { UpdateMuridDto } from './dto/update-murid.dto';
import { RombelRepository } from '../rombel/rombel.repository';


@Injectable()
export class MuridService {
    constructor(private readonly muridRepository: MuridRepository) { }

    async create(dto: CreateMuridDto) {
        return await this.muridRepository.create(dto);
    }

    async updateById(id: string, dto: UpdateMuridDto) {
        return await this.muridRepository.updateById(id, dto);
    }

    async deleteById(id: string) {
        return await this.muridRepository.deleteById(id);
    }

    async findAll() {
        return await this.muridRepository.findAll();
    }

    async findOne(id: string) {
        return await this.muridRepository.findByIdOrThrow(id);
    }
}