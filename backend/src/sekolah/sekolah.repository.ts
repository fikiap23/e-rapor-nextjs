import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SekolahQuery } from '../prisma/queries/sekolah/sekolah.query';
import { CreateSekolahDto } from './dto/create-sekolah.dto';
import { UpdateSekolahDto } from './dto/update-sekolah.dto';

@Injectable()
export class SekolahRepository {
    constructor(private readonly sekolahQuery: SekolahQuery) { }

    async findByIdOrThrow(id: string) {
        const sekolah = await this.sekolahQuery.findById(id);
        if (!sekolah) throw new BadRequestException('Sekolah tidak ditemukan');
    }

    async findSekolah() {
        const sekolah = await this.sekolahQuery.findAll()
        if (!sekolah || sekolah.length == 0) throw new NotFoundException('Sekolah belum ada');
        return sekolah[0]
    }

    async create(dto: CreateSekolahDto) {
        const isExist = await this.sekolahQuery.findAll()
        if (isExist.length > 0) throw new BadRequestException('Sekolah sudah ada')
        return await this.sekolahQuery.create(dto)
    }

    async update(dto: UpdateSekolahDto) {
        const sekolah = await this.sekolahQuery.findAll()
        if (!sekolah || sekolah.length == 0) throw new BadRequestException('Sekolah tidak ditemukan')

        const id = sekolah[0].id
        return await this.sekolahQuery.updateById(id, dto)
    }
}