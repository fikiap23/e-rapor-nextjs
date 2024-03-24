import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import CreateGuruDto from '../../../guru/dto/create-guru.dto';
import { UpdateGuruDto } from '../../../guru/dto/update-guru.dto';
import { GuruQueryDto } from '../../../guru/dto/guru.query.dto';



@Injectable()
export class GuruQuery extends DbService {

    async findByNip(nip: string) {
        return await this.prisma.guru.findUnique({
            where: {
                nip
            }
        })
    }

    async create(idUser: string, data: CreateGuruDto) {
        return await this.prisma.guru.create({
            data: {
                idUser,
                ...data
            }
        })
    }

    async updateById(id: string, data: UpdateGuruDto) {
        return this.prisma.guru.update({
            where: {
                id
            },
            data
        })
    }

    async findById(id: string) {
        return await this.prisma.guru.findUnique({
            where: {
                id
            },
        })
    }

    async findAll(dto: GuruQueryDto) {
        if (!dto.status && !dto.search) {
            return await this.prisma.guru.findMany({
                include: {
                    user: {
                        select: {
                            status: true,
                            email: true,
                            foto: true,
                        }
                    }
                }
            })
        } else {
            return await this.prisma.guru.findMany({
                where: {
                    AND: [
                        {
                            OR: [
                                {
                                    nip: {
                                        contains: dto.search
                                    }
                                },
                                {
                                    nama: {
                                        contains: dto.search,
                                        mode: 'insensitive'
                                    }
                                }
                            ]
                        },
                        {
                            user: {
                                status: dto.status
                            }
                        }
                    ]
                },
                include: {
                    user: {
                        select: {
                            status: true,
                            email: true,
                            foto: true,
                        }
                    }
                }
            })
        }
    }

}