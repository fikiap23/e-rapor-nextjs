import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateSemesterDto } from '../../../semester/dto/create-semester.dto';
import { UpdateSemesterDto } from '../../../semester/dto/update-semester.dto';

@Injectable()
export class SemesterQuery extends DbService {

    async findAll() {
        return await this.prisma.semester.findMany()
    }

    async findById(id: string) {
        return await this.prisma.semester.findUnique({ where: { id } })
    }

    async create(payload: CreateSemesterDto) {
        return await this.prisma.semester.create({ data: payload })
    }

    async updateById(id: string, payload: UpdateSemesterDto) {
        return await this.prisma.semester.update({ where: { id }, data: payload })
    }

    async deleteById(id: string) {
        return await this.prisma.semester.delete({ where: { id } })
    }
}