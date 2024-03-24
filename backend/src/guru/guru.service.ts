import { Injectable } from '@nestjs/common';
import { GuruRepository } from './guru.repository';
import CreateGuruDto from './dto/create-guru.dto';
import { UpdateGuruDto } from './dto/update-guru.dto';
import { GuruQueryDto } from './dto/guru.query.dto';

@Injectable()
export class GuruService {
    constructor(private readonly guruRepository: GuruRepository) { }

    async create(dto: CreateGuruDto) {
        return await this.guruRepository.create(dto)
    }

    async updateByAdmin(id: string, dto: UpdateGuruDto) {
        return await this.guruRepository.updateByAdmin(id, dto)
    }

    async findAll(dto: GuruQueryDto) {
        return await this.guruRepository.findAllGuru(dto)
    }

    async findOne(id: string) {
        return await this.guruRepository.findGuruByIdOrThrow(id)
    }

    async deleteByAdmin(id: string) {
        return await this.guruRepository.deleteByAdmin(id)
    }
}