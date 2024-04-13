import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import CreateMuridDto from '../../../murid/dto/create-murid.dto';
import { UpdateMuridDto } from '../../../murid/dto/update-murid.dto';
import { Agama, JenisKelamin } from '@prisma/client';



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

    async findByNullIdRombel() {
        return await this.prisma.murid.findMany({
            where: {
                idRombel: null
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

    async createMany(data: CreateMuridDto[]) {
        if (!data || data.length === 0) {
            throw new BadRequestException('Data cannot be empty');
        }

        try {
            const newData = []; // Menyimpan data yang valid dan tidak duplikat
            const duplicateNisn = new Set(); // Menyimpan NISN duplikat untuk memberikan informasi kepada pengguna
            const duplicateNis = new Set(); // Menyimpan NIS duplikat untuk memberikan informasi kepada pengguna

            for (const murid of data) {
                if (!Object.values(JenisKelamin).includes(murid.jenisKelamin)) {
                    throw new BadRequestException(`Siswa dengan NIS ${murid.nis} tidak valid: ${murid.jenisKelamin}`);
                }

                if (murid.agama && !Object.values(Agama).includes(murid.agama)) {
                    throw new BadRequestException(`Siswa dengan NIS ${murid.nis} tidak valid: ${murid.agama}`);
                }

                const existingMurid = await this.prisma.murid.findFirst({
                    where: {
                        OR: [
                            { nisn: murid.nisn },
                            { nis: murid.nis }
                        ]
                    }
                });

                if (existingMurid) {
                    duplicateNisn.add(murid.nisn);
                    duplicateNis.add(murid.nis);
                } else {
                    newData.push(murid);
                }
            }

            if (duplicateNisn.size > 0 || duplicateNis.size > 0) {
                throw new BadRequestException(`Data duplikat: NISN (${[...duplicateNisn].join(', ')}), NIS (${[...duplicateNis].join(', ')})`);
            }

            const result = await this.prisma.murid.createMany({ data: newData });
            console.log(`Created ${result.count} murids`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findOneStudentByIdRombelSemesterGuru(id: string) {
        const checkRombelSemesterGuru = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id
            }
        })
        if (!checkRombelSemesterGuru) {
            throw new BadRequestException('Rombel tidak ditemukan')
        }
        const originalData = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id
            },
            select: {
                rombel: {
                    select: {
                        id: true,
                        name: true,
                        murid: {
                            select: {
                                nama: true,
                                nis: true,
                                rapor: {
                                    where: {
                                        idSemester: checkRombelSemesterGuru.idSemester
                                    }
                                },
                            }
                        }
                    }
                },
                semester: {
                    select: {
                        id: true,
                        tahunAjaranAwal: true,
                        tahunAjaranAkhir: true,
                        jenisSemester: true,
                    }
                },
            }

        })
        const newData = {
            ...originalData,
            rombel: {
                id: originalData.rombel.id,
                name: originalData.rombel.name,
            },
            semester: {
                id: originalData.semester.id,
                tahunAjaranAwal: originalData.semester.tahunAjaranAwal,
                tahunAjaranAkhir: originalData.semester.tahunAjaranAkhir,
                jenisSemester: originalData.semester.jenisSemester,
                name: `${originalData.semester.tahunAjaranAwal}-${originalData.semester.tahunAjaranAkhir} (${originalData.semester.jenisSemester})`

            },
            murid: originalData.rombel.murid
        };

        return newData;
    }

    async findStudentByIdRombelSemesterGuru(idRombelSemesterGuru: string) {
        const checkRombelSemesterGuru = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id: idRombelSemesterGuru
            }
        })
        if (!checkRombelSemesterGuru) {
            throw new BadRequestException('Rombel tidak ditemukan')
        }
        const originalData = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id: idRombelSemesterGuru
            },
            select: {
                rombel: {
                    select: {
                        id: true,
                        name: true,
                        murid: {
                            select: {
                                id: true,
                                nama: true,
                                nis: true,
                                foto: true,
                            }
                        }
                    }
                },
            }

        })

        return originalData.rombel?.murid || [];
    }
}