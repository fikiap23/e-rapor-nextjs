import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateSekolahDto } from '../../../sekolah/dto/create-sekolah.dto';
import { UpdateSekolahDto } from '../../../sekolah/dto/update-sekolah.dto';

@Injectable()
export class SekolahQuery extends DbService {

    async findById(id: string) {
        return await this.prisma.sekolah.findUnique({ where: { id } })
    }

    async findAll() {
        return await this.prisma.sekolah.findMany()
    }

    async create(payload: CreateSekolahDto) {
        return await this.prisma.sekolah.create({ data: payload })
    }

    async updateById(id: string, payload: UpdateSekolahDto) {
        return await this.prisma.sekolah.update({ where: { id }, data: payload })
    }
}