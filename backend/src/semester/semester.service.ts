import { Injectable } from '@nestjs/common';
import { SemesterRepository } from './semester.repository';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@Injectable()
export class SemesterService {
    constructor(private readonly semesterRepository: SemesterRepository) { }

    async findAll() {
        return await this.semesterRepository.findAll();
    }

    async findOne(id: string) {
        return await this.semesterRepository.findByIdOrThrow(id);
    }

    async create(payload: CreateSemesterDto) {
        return await this.semesterRepository.create(payload);
    }

    async updateById(id: string, dto: UpdateSemesterDto) {
        return await this.semesterRepository.updateById(id, dto);
    }

    async deleteById(id: string) {
        return await this.semesterRepository.deleteById(id);
    }
}