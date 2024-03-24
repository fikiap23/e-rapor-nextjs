import { BadRequestException, Injectable } from '@nestjs/common';
import { SemesterQuery } from '../prisma/queries/semester/semester.query.dto';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@Injectable()
export class SemesterRepository {
    constructor(private readonly semesterQuery: SemesterQuery) { }

    async findAll() {
        return await this.semesterQuery.findAll();
    }

    async findByIdOrThrow(id: string) {
        const semester = await this.semesterQuery.findById(id);
        if (!semester) throw new BadRequestException('Semester tidak ditemukan');
        return semester
    }

    async create(payload: CreateSemesterDto) {
        return await this.semesterQuery.create(payload);
    }

    async updateById(id: string, dto: UpdateSemesterDto) {
        await this.findByIdOrThrow(id);
        return await this.semesterQuery.updateById(id, dto);
    }

    async deleteById(id: string) {
        await this.findByIdOrThrow(id);
        return await this.semesterQuery.deleteById(id);
    }
}