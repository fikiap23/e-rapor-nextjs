import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import CreateMuridDto from '../../../murid/dto/create-murid.dto';
import { UpdateMuridDto } from '../../../murid/dto/update-murid.dto';



@Injectable()
export class MuridQuery extends DbService {

    async findAll() {
        return await this.prisma.murid.findMany()
    }

    async findById(id: string) {
        return await this.prisma.murid.findUnique({
            where: {
                id
            }
        })
    }

    async findByNis(nis: string) {
        return await this.prisma.murid.findUnique({
            where: {
                nis
            }
        })
    }

    async findByNisn(nisn: string) {
        return await this.prisma.murid.findUnique({
            where: {
                nisn
            }
        })
    }

    async checkIsNisOrNisnHasUsed(nis: string, nisn: string): Promise<boolean> {
        const isNisOrNisnHasUsed = await this.prisma.murid.findFirst({ where: { OR: [{ nis }, { nisn }] } })
        return isNisOrNisnHasUsed ? true : false
    }

    async create(data: CreateMuridDto) {
        return await this.prisma.murid.create({ data })
    }

    async updateById(id: string, data: UpdateMuridDto) {
        return await this.prisma.murid.update({
            where: {
                id
            },
            data
        })
    }

    async deleteById(id: string) {
        return await this.prisma.murid.delete({ where: { id } })
    }
}