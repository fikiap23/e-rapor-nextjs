import { Injectable } from '@nestjs/common';
import { RaporRepository } from './rapor.repositoy';
import { CreateRaporDto } from './dto/create-rapor.dto';
import { UpdateRaporDto } from './dto/update-rapor.dto';

@Injectable()
export class RaporService {
    constructor(
        private readonly raporRepository: RaporRepository
    ) { }

    async create(token: string, dto: CreateRaporDto) {
        return await this.raporRepository.create(token, dto)
    }

    async findByIdMurid(idMurid: string) {
        return await this.raporRepository.findByIdMurid(idMurid)
    }

    async updateById(token: string, id: string, dto: UpdateRaporDto) {
        return await this.raporRepository.update(token, id, dto)
    }
}