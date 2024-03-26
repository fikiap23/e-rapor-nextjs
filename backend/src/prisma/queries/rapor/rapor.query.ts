import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateRaporDto } from '../../../rapor/dto/create-rapor.dto';

@Injectable()
export class RaporQuery extends DbService {

    async findById(id: string) {
        return this.prisma.rapor.findUnique({
            where: {
                id
            }
        })
    }

    async create(idSekolah: string, idRombel: string, payload: CreateRaporDto) {
        return await this.prisma.rapor.create({ data: { ...payload, idSekolah, idRombel } })
    }
}