import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCPDto } from './dto/create-cp.dto';
import { CreateTPDto } from './dto/create-tp.dto';

@Injectable()
export class CpTpRepository {
    constructor(private readonly prisma: PrismaService) { }

    /*
  |--------------------------------------------------------------------------
  | CRUD Capaian Pembelajaran(CP), CP hanya boleh 1 saja
  |--------------------------------------------------------------------------
  */
    async createCP(data: CreateCPDto) {
        const cp = await this.prisma.capaianPembelajarn.findMany()
        if (cp.length > 0) throw new BadRequestException('Capaian pembelajaran sudah ada')
        return await this.prisma.capaianPembelajarn.create({ data })
    }

    async findOneCpOrThrow() {
        const cp = await this.prisma.capaianPembelajarn.findFirst()
        if (!cp) throw new BadRequestException('Capaian pembelajaran tidak ditemukan')
        return cp
    }

    async findCp() {
        return await this.prisma.capaianPembelajarn.findFirst()
    }

    async updateCp(data: CreateCPDto) {
        const cp = await this.findCp()
        if (!cp) return await this.prisma.capaianPembelajarn.create({ data })
        return await this.prisma.capaianPembelajarn.update({ where: { id: cp.id }, data })
    }

    async findCpWithTp() {
        return await this.prisma.capaianPembelajarn.findFirst({
            include: {
                tujuanPembelajaran: {
                    orderBy: { minggu: 'asc' }
                }
            }
        })
    }

    /*
    |--------------------------------------------------------------------------
    | CRUD Tujuan Pembelajaran(TP), TP Boleh lebih dari 1
    |--------------------------------------------------------------------------
    */
    async createTP(data: CreateTPDto) {
        // get CP
        const cp = await this.findOneCpOrThrow()
        await this.checkIsTpExitsByMinggu(data.minggu)
        return await this.prisma.tujuanPembelajaran.create({ data: { ...data, idCapaianPembelajaran: cp.id } })
    }

    async findTpByIdOrThrow(id: string) {
        const tp = await this.prisma.tujuanPembelajaran.findUnique({ where: { id } })
        if (!tp) throw new BadRequestException('Tujuan pembelajaran tidak ditemukan')
        return tp
    }

    async checkIsTpExitsByMinggu(minggu: number) {
        const tp = await this.prisma.tujuanPembelajaran.findUnique({ where: { minggu } })
        if (tp) throw new BadRequestException(`Tujuan pembelajaran minggu ${minggu} sudah ada`)
        return
    }

    async updateTpById(id: string, data: Partial<CreateTPDto>) {
        const tp = await this.findTpByIdOrThrow(id)
        if (tp.minggu !== data.minggu) await this.checkIsTpExitsByMinggu(data.minggu)
        return await this.prisma.tujuanPembelajaran.update({ where: { id }, data })
    }

    async deleteTpById(id: string) {
        await this.findTpByIdOrThrow(id)
        return await this.prisma.tujuanPembelajaran.delete({ where: { id } })
    }

    async findAllTp() {
        return await this.prisma.tujuanPembelajaran.findMany()
    }

}