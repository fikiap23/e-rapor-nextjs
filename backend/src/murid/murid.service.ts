import { Injectable } from '@nestjs/common';
import { MuridRepository } from './murid.repository';
import CreateMuridDto from './dto/create-murid.dto';
import { UpdateMuridDto } from './dto/update-murid.dto';

@Injectable()
export class MuridService {
    constructor(private readonly muridRepository: MuridRepository) { }

    async create(dto: CreateMuridDto, file: Express.Multer.File) {
        return await this.muridRepository.create(dto, file);
    }

    async updateById(id: string, dto: UpdateMuridDto, file: Express.Multer.File) {
        return await this.muridRepository.updateById(id, dto, file);
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

    async findByNullRombel() {
        return await this.muridRepository.findByNullRombel();
    }
}