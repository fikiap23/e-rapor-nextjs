import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import CreateMapelDto from '../../../mapel/dto/create-mapel.dto';
import { UpdateMapelDto } from '../../../mapel/dto/update-mapel.dto';

@Injectable()
export class MapelQuery extends DbService {

    async findAll() {
        return await this.prisma.mapel.findMany()
    }

    async findById(id: string) {
        return await this.prisma.mapel.findUnique({ where: { id } })
    }

    async checkIsNameHasUsed(name: string): Promise<boolean> {
        const isNameHasUsed = await this.prisma.mapel.findFirst({ where: { name } })
        return isNameHasUsed ? true : false
    }

    async create(payload: CreateMapelDto) {
        return await this.prisma.mapel.create({ data: payload })
    }

    async updateById(id: string, payload: UpdateMapelDto) {
        return await this.prisma.mapel.update({ where: { id }, data: payload })
    }

    async deleteById(id: string) {
        return await this.prisma.mapel.delete({ where: { id } })
    }

}