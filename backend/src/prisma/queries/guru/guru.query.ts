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
        const guru = await this.prisma.guru.create({
            data: {
                idUser,
                ...data
            },
            include: {
                user: true
            }
        })

        return {
            id: guru.id,
            idUser: guru.idUser,
            nama: guru.nama,
            nip: guru.nip,
            jenisKelamin: guru.jenisKelamin,
            status: guru.user.status,
            email: guru.user.email,
            foto: guru.user.foto
        }
    }

    async updateById(id: string, data: UpdateGuruDto) {
        const guru = await this.prisma.guru.update({
            where: {
                id
            },
            data,
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

        return {
            id: guru.id,
            idUser: guru.idUser,
            nama: guru.nama,
            nip: guru.nip,
            jenisKelamin: guru.jenisKelamin,
            status: guru.user.status,
            email: guru.user.email,
            foto: guru.user.foto
        }
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
            const gurus = await this.prisma.guru.findMany({
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
            // format data
            return gurus.map(item => {
                return {
                    id: item.id,
                    idUser: item.idUser,
                    nama: item.nama,
                    nip: item.nip,
                    jenisKelamin: item.jenisKelamin,
                    status: item.user.status,
                    email: item.user.email,
                    foto: item.user.foto,
                }
            })

        } else {
            const gurus = await this.prisma.guru.findMany({
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

            // format data
            return gurus.map(item => {
                return {
                    nama: item.nama,
                    nip: item.nip,
                    jenisKelamin: item.jenisKelamin,
                    status: item.user.status,
                    email: item.user.email,
                    foto: item.user.foto,
                }
            })
        }
    }

}