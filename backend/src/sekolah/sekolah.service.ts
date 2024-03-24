import { Injectable } from '@nestjs/common';
import { SekolahRepository } from './sekolah.repository';
import { CreateSekolahDto } from './dto/create-sekolah.dto';
import { UpdateSekolahDto } from './dto/update-sekolah.dto';

@Injectable()
export class SekolahService {
    constructor(private readonly sekolahRepository: SekolahRepository) { }

    async findOne() {
        return await this.sekolahRepository.findSekolah();
    }

    async create(dto: CreateSekolahDto) {
        return await this.sekolahRepository.create(dto)
    }

    async update(dto: UpdateSekolahDto) {
        return await this.sekolahRepository.update(dto)
    }
}