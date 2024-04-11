import { BadRequestException, Injectable } from '@nestjs/common';
import { AbsensiQuery } from '../prisma/queries/absensi/absensi.query.dto';
import { CreateAbsensiDto } from './dto/create-absensi.dto';
import { AuthRepository } from '../auth/auth.repository';
import { PayloadToken } from '../auth/type';
import { JadwalAjarRepository } from '../jadwal-ajar/jadwal-ajar.repository';
import { MuridRepository } from '../murid/murid.repository';
import { BulkAbsensiByJadwalDto } from './dto/bulk-absensi-by-jadwal.dto';

@Injectable()
export class AbsensiRepository {
    constructor(
        private readonly absensiQuery: AbsensiQuery,
        private readonly authRepository: AuthRepository,
        private readonly jadwalAjarRepository: JadwalAjarRepository,
        private readonly muridRepository: MuridRepository
    ) { }

    async findAll() {
        return await this.absensiQuery.findAll()
    }

    async findByIdOrThrow(id: string) {
        const absensi = await this.absensiQuery.findById(id);
        if (!absensi) throw new BadRequestException('Absensi tidak ditemukan');
        return absensi
    }

    async findManyByIdMurid(idMurid: string) {
        return await this.absensiQuery.findByIdMurid(idMurid);
    }

    async findByIdMuridAndIdJadwalAjarOrThrow(idMurid: string, idJadwalAjar: string) {
        const absensi = await this.absensiQuery.findByIdMuridAndIdJadwal(idMurid, idJadwalAjar);
        if (!absensi || absensi.length == 0) throw new BadRequestException('Absensi tidak ditemukan');
        return absensi
    }

    async checkIsAbsensiExist(idMurid: string, idJadwalAjar: string) {
        const absensi = await this.absensiQuery.findByIdMuridAndIdJadwal(idMurid, idJadwalAjar);
        if (absensi && absensi.length > 0) throw new BadRequestException('Absensi sudah ada')
        return
    }

    async create(token: string, dto: CreateAbsensiDto) {
        try {
            // get decode payload jwt token
            const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;

            // check jadwal ajar exist
            const jadwalAjar = await this.jadwalAjarRepository.findByIdOrThrow(dto.idJadwalAjar);
            if (!idsRombelSemesterGuru.includes(jadwalAjar.idRombelSemesterGuru)) throw new BadRequestException('Akun tidak terdaftar di rombel ini');

            // check murid exist
            const murid = await this.muridRepository.findByIdOrThrow(dto.idMurid);
            // if (murid.idRombel !== idsRombel[0]) throw new BadRequestException('Murid tidak terdaftar di rombel ini');

            // check absensi exist
            await this.checkIsAbsensiExist(dto.idMurid, dto.idJadwalAjar);
            const dataAbsensi = await this.absensiQuery.create(dto);
            if (!dataAbsensi) throw new BadRequestException('Absensi gagal ditambahkan');
            return dataAbsensi
        }
        catch (error) {
            throw error
        }
    }



    async createManyByJadwal(token: string, idJadwalAjar: string, dto: BulkAbsensiByJadwalDto[]) {
        try {
            // get decode payload jwt token
            const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;

            // check murid exist
            const murids = await this.absensiQuery.checkIsAbsensiExistByBulk(dto.map(item => item.idMurid), idJadwalAjar);
            if (murids) throw new BadRequestException('Sebagian Absensi sudah ada');

            // check jadwal ajar exist
            const jadwalAjar = await this.jadwalAjarRepository.findByIdOrThrow(idJadwalAjar);
            if (!idsRombelSemesterGuru.includes(jadwalAjar.idRombelSemesterGuru)) throw new BadRequestException('Akun tidak terdaftar di rombel ini');

            const dataAbsensi = await this.absensiQuery.createMany(idJadwalAjar, dto);
            if (!dataAbsensi) throw new BadRequestException('Absensi gagal ditambahkan');
            return dataAbsensi
        }
        catch (error) {
            throw error
        }
    }
}