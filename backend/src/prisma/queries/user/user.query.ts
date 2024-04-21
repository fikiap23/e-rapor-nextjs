import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateUserDto } from '../../../auth/dto/create-user.dto';
import { UpdateUserDto } from '../../../auth/dto/update-user.dto';
import { StatusAkun } from '@prisma/client';


@Injectable()
export class UserQuery extends DbService {
    async findById(id: string) {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async findByEmailOrUsername(emailOrUsername: string) {
        return await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrUsername },
                    { username: emailOrUsername },
                ],
            },
        });
    }

    async findAllWithoutPassword() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                status: true,
            },
        });
    }

    async findMe(id: string) {
        const data = await this.prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                username: true,
                guru: true,
            }
        });

        if (!data) {
            throw new BadRequestException('User tidak ada')
        }

        return data
    }

    async create(data: CreateUserDto) {
        return await this.prisma.user.create({ data })
    }

    async update(id: string, data: UpdateUserDto) {
        return await this.prisma.user.update({ where: { id }, data })
    }

    async delete(id: string) {
        return await this.prisma.user.delete({ where: { id } })
    }

    async getDashboardAdmin() {
        const [totalMurid, totalGuru, totalRombel, totalSemester, totalKelompokUsia] = await this.prisma.$transaction([
            this.prisma.murid.count(),
            this.prisma.guru.count(),
            this.prisma.rombel.count(),
            this.prisma.semester.count(),
            this.prisma.kategoriRombel.count()
        ]);

        const [totalMuridAktif, totalGuruAktif, totalSemesterAktif] = await this.prisma.$transaction([
            this.prisma.murid.count({
                where: {
                    status: StatusAkun.AKTIF
                }
            }),
            this.prisma.guru.count({
                where: {
                    user: {
                        status: StatusAkun.AKTIF
                    }
                }
            }),
            this.prisma.semester.count({
                where: {
                    isAktif: true
                }
            })
        ]);

        return { totalMurid, totalMuridAktif, totalGuru, totalGuruAktif, totalRombel, totalSemester, totalSemesterAktif, totalKelompokUsia };
    }
}