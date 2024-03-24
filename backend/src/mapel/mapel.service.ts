import { Injectable } from '@nestjs/common';
import { MapelRepository } from './mapel.repository';
import CreateMapelDto from './dto/create-mapel.dto';
import { UpdateMapelDto } from './dto/update-mapel.dto';

@Injectable()
export class MapelService {
    constructor(private readonly mapelRepository: MapelRepository) { }

    async create(dto: CreateMapelDto) {
        return await this.mapelRepository.create(dto)
    }

    async update(id: string, dto: UpdateMapelDto) {
        return await this.mapelRepository.update(id, dto)
    }

    async delete(id: string) {
        return await this.mapelRepository.delete(id)
    }

    async findAll() {
        return await this.mapelRepository.findAll()
    }

    async findOne(id: string) {
        return await this.mapelRepository.findByIdOrThrow(id)
    }
}