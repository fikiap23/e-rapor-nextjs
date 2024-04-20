import { BadRequestException, Injectable } from '@nestjs/common';
import { JadwalAjarQuery } from '../prisma/queries/jadwal-ajar/jadwal-ajar.query';
import { ModulAjarRepository } from '../modul-ajar/modul-ajar.repository';
import { CreateJadwalAjarDto } from './dto/create-jadwal-ajar.dto';
import { AuthRepository } from '../auth/auth.repository';
import { PayloadToken } from '../auth/type';
import { UpdateJadwalAjarDto } from './dto/update-jadwal-ajar.dto';
import { RombelQuery } from '../prisma/queries/rombel/rombel.query';

@Injectable()
export class JadwalAjarRepository {
    constructor(
        private readonly jadwalAjarQuery: JadwalAjarQuery,
        private readonly modulAjarRepository: ModulAjarRepository,
        private readonly authRepository: AuthRepository,
    ) { }

    async findAll(token: string, idRombelSemesterGuru: string) {
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken
        if (!idsRombelSemesterGuru.includes(idRombelSemesterGuru)) return null
        return await this.jadwalAjarQuery.findAll(idRombelSemesterGuru);
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

    async createJadwalAjar(token: string, dto: CreateJadwalAjarDto) {
        //! get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        // check idModulAjar
        const modulAjar = await this.modulAjarRepository.findByIdOrThrow(dto.idModulAjar)

        if (!idsRombelSemesterGuru.includes(modulAjar.idRombelSemesterGuru)) throw new BadRequestException("Modul Ajar tidak ada")
        await this.checkIsJadwalAjarExist(dto.idModulAjar)

        return await this.jadwalAjarQuery.create(modulAjar.idRombelSemesterGuru, dto);
    }

    async updateById(token: string, id: string, dto: UpdateJadwalAjarDto) {
        const jadwalAjar = await this.findByIdOrThrow(id);

        // get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;

        if (!idsRombelSemesterGuru.includes(jadwalAjar.idRombelSemesterGuru)) throw new BadRequestException("Modul Ajar tidak ada")

        if (dto.idModulAjar && dto.idModulAjar !== jadwalAjar.idModulAjar) await this.modulAjarRepository.findByIdOrThrow(dto.idModulAjar);
        if (dto.idModulAjar && dto.idModulAjar !== jadwalAjar.idModulAjar) await this.checkIsJadwalAjarExist(dto.idModulAjar)

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

    async checkIsJadwalAjarExist(idModulAjar: string) {
        const jadwal = await this.jadwalAjarQuery.findByIdModulAjar(idModulAjar);
        if (jadwal) throw new BadRequestException('Jadwal Ajar sudah ada');
        return
    }
}