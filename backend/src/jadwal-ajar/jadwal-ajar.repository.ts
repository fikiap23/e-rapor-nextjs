import { BadRequestException, Injectable } from '@nestjs/common';
import { JadwalAjarQuery } from '../prisma/queries/jadwal-ajar/jadwal-ajar.query';
import { ModulAjarRepository } from '../modul-ajar/modul-ajar.repository';
import { CreateJadwalAjarDto } from './dto/create-jadwal-ajar.dto';
import { HariType } from '@prisma/client';
import { AuthRepository } from '../auth/auth.repository';
import { PayloadToken } from '../auth/type';
import { UpdateJadwalAjarDto } from './dto/update-jadwal-ajar.dto';

@Injectable()
export class JadwalAjarRepository {
    constructor(
        private readonly jadwalAjarQuery: JadwalAjarQuery,
        private readonly modulAjarRepository: ModulAjarRepository,
        private readonly authRepository: AuthRepository,
    ) { }

    async findAll(token: string) {
        //! get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken
        return await this.jadwalAjarQuery.findAll(idsRombelSemesterGuru[0]);
    }

    async findByIdOrThrow(id: string) {
        const jadwalAjar = await this.jadwalAjarQuery.findById(id);
        if (!jadwalAjar) throw new BadRequestException('Jadwal Ajar tidak ditemukan');
        return jadwalAjar
    }

    async findByIdModulAjar(idModulAjar: string) {
        await this.modulAjarRepository.findByIdOrThrow(idModulAjar);
        return await this.jadwalAjarQuery.findByIdModulAjar(idModulAjar);
    }

    async checkIsHariHasUsed(idModulAjar: string, hari: HariType,) {
        const jadwalAjar = await this.jadwalAjarQuery.checkIsHariHasUsed(idModulAjar, hari);
        if (jadwalAjar) throw new BadRequestException('Hari ini sudah ada jadwal ajar');
        return
    }

    async createJadwalAjar(token: string, dto: CreateJadwalAjarDto) {
        //! get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        // check module ajar is exist
        await this.modulAjarRepository.findByIdAndRombelOrThrow(dto.idModulAjar, idsRombelSemesterGuru[0]);
        // check hari exist
        await this.checkIsHariHasUsed(dto.idModulAjar, dto.hari);
        return await this.jadwalAjarQuery.create(idsRombelSemesterGuru[0], dto);
    }

    async updateById(token: string, id: string, dto: UpdateJadwalAjarDto) {
        const jadwalAjar = await this.findByIdOrThrow(id);

        // get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;

        //! check module ajar is exist
        if (dto.idModulAjar && dto.idModulAjar !== jadwalAjar.idModulAjar) await this.modulAjarRepository.findByIdAndRombelOrThrow(dto.idModulAjar, idsRombelSemesterGuru[0]);

        if (dto.hari && dto.hari !== jadwalAjar.hari) await this.checkIsHariHasUsed(dto.idModulAjar, dto.hari);
        return await this.jadwalAjarQuery.updateById(id, dto);
    }

    async deleteById(token: string, id: string) {
        const jadwalAjar = await this.findByIdOrThrow(id);
        // get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        if (!idsRombelSemesterGuru.includes(jadwalAjar.idRombelSemesterGuru)) throw new BadRequestException('Akun tidak terdaftar di rombel ini');
        return await this.jadwalAjarQuery.deleteById(id);
    }

    async findByIdsOrThrow(ids: string[]) {
        const jadwalAjar = await this.jadwalAjarQuery.findByIds(ids);
        if (ids.length !== jadwalAjar.length) throw new BadRequestException('Sebagian jadwal ajar tidak ditemukan');
        return jadwalAjar
    }
}