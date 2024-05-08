import { BadRequestException, Injectable } from '@nestjs/common';
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

    async findAndCheckIsPossibleDelete(id: string) {
        const guru = await this.prisma.guru.findUnique({
            where: {
                id
            },
            include: {
                user: true,
                rapor: true,
                rombelSemesterGuru: true,
            }
        })

        if (!guru) {
            throw new BadRequestException('Guru tidak ditemukan')
        }

        if (guru.rapor?.length > 0 || guru.rombelSemesterGuru?.length > 0) {
            throw new BadRequestException('Tidak bisa menghapus guru yang sudah pernah menginput nilai')
        }

        return guru
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
                            username: true
                        }
                    }
                },
                orderBy: {
                    nip: 'asc'
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
                    username: item.user.username,
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

    async findAllRombelDiampu(id: string, status: string = "ACTIVE") {
        const data = await this.prisma.rombelSemesterGuru.findMany({
            where: { idGuru: id },
            select: {
                id: true,

                rombel: {
                    select: {
                        id: true,
                        name: true,
                        kategoriRombel: true
                    }
                },
                semester: true
            }
        })

        const rombels = []

        switch (status) {
            case "ACTIVE":
                for (let i = 0; i < data.length; i++) {
                    if (data[i].semester.isAktif) {
                        rombels.push({
                            id: data[i].id,
                            idRombel: data[i].rombel.id,
                            idSemester: data[i].semester.id,
                            name: data[i].rombel.name,
                            semester: `${data[i].semester.tahunAjaranAwal}-${data[i].semester.tahunAjaranAkhir} (${data[i].semester.jenisSemester})`,
                            statusSemester: data[i].semester.isAktif,
                            kelompokUsia: data[i].rombel.kategoriRombel.kelompokUsia
                        })
                    }
                }
                break;
            case "INACTIVE":
                for (let i = 0; i < data.length; i++) {
                    if (!data[i].semester.isAktif) {
                        rombels.push({
                            id: data[i].id,
                            idRombel: data[i].rombel.id,
                            idSemester: data[i].semester.id,
                            name: data[i].rombel.name,
                            semester: `${data[i].semester.tahunAjaranAwal}-${data[i].semester.tahunAjaranAkhir} (${data[i].semester.jenisSemester})`,
                            statusSemester: data[i].semester.isAktif,
                            kelompokUsia: data[i].rombel.kategoriRombel.kelompokUsia
                        })
                    }
                }
                break;
            case "ALL":
                for (let i = 0; i < data.length; i++) {
                    rombels.push({
                        id: data[i].id,
                        idRombel: data[i].rombel.id,
                        idSemester: data[i].semester.id,
                        name: data[i].rombel.name,
                        semester: `${data[i].semester.tahunAjaranAwal}-${data[i].semester.tahunAjaranAkhir} (${data[i].semester.jenisSemester})`,
                        statusSemester: data[i].semester.isAktif,
                        kelompokUsia: data[i].rombel.kategoriRombel.kelompokUsia
                    })
                }
                break;
            default:
                for (let i = 0; i < data.length; i++) {
                    rombels.push({
                        id: data[i].id,
                        idRombel: data[i].rombel.id,
                        idSemester: data[i].semester.id,
                        name: data[i].rombel.name,
                        semester: `${data[i].semester.tahunAjaranAwal}-${data[i].semester.tahunAjaranAkhir} (${data[i].semester.jenisSemester})`,
                        statusSemester: data[i].semester.isAktif,
                        kelompokUsia: data[i].rombel.kategoriRombel.kelompokUsia
                    })
                }
                break;
        }

        return rombels
    }

    async getDashboardGuru(id: string) {
        const rombelSemesterGurus = await this.prisma.rombelSemesterGuru.findMany({
            where: {
                idGuru: id,
                semester: {
                    isAktif: true
                }
            },
            select: {
                id: true,
                rombel: {
                    select: {
                        id: true,
                        murid: {
                            select: {
                                id: true
                            }
                        }
                    }
                },
                semester: {
                    select: {
                        id: true
                    }
                }
            }
        });

        const raporCount = await this.prisma.rapor.count({
            where: {
                isValidated: true,
                idRombelSemesterGuru: {
                    in: rombelSemesterGurus.map((rombelSemesterGuru) => rombelSemesterGuru.id)
                }
            }
        });

        const totalMuridDiampu = rombelSemesterGurus.reduce((total, rombelSemesterGuru) => {
            return total + rombelSemesterGuru.rombel.murid.length;
        }, 0);

        const totalRaportTersedia = raporCount;
        const totalRaportBelumSiap = totalMuridDiampu - raporCount;

        return {
            totalRaportTersedia,
            totalRaportBelumSiap,
            totalMuridDiampu
        };
    }

}