import { BadRequestException, Injectable } from '@nestjs/common';
import { ModulAjarQuery } from '../prisma/queries/modul-ajar/modul-ajar.query';
import { AuthRepository } from '../auth/auth.repository';
import { PayloadToken } from '../auth/type';
import CreateModulAjarDto from './dto/create-modul-ajar.dto';
import { MapelRepository } from '../mapel/mapel.repository';
import { UpdateModulAjarDto } from './dto/update-modul-ajar.dto';

@Injectable()
export class ModulAjarRepository {
    constructor(
        private readonly modulAjarQuery: ModulAjarQuery,
        private readonly authRepository: AuthRepository,
        private readonly mapelRepository: MapelRepository
    ) { }

    async findAllModulAjar() {
        return await this.modulAjarQuery.findAll();
    }

    async findByIdOrThrow(id: string) {
        const modulAjar = await this.modulAjarQuery.findById(id);
        if (!modulAjar) throw new BadRequestException('Modul Ajar tidak ditemukan');
        return modulAjar
    }

    async findByIdAndRombelOrThrow(id: string, idRombel: string) {
        const modulAjar = await this.modulAjarQuery.findByIdAndRombel(id, idRombel);
        if (!modulAjar) throw new BadRequestException('Modul Ajar tidak ditemukan');
        return modulAjar
    }

    async checkIsMingguHasUsed(minggu: number, idMapel: string, idRombel: string) {
        ;
        const modulAjar = await this.modulAjarQuery.checkIsMingguHasUsed(minggu, idMapel, idRombel);
        if (modulAjar) throw new BadRequestException('Minggu ini sudah ada modul ajar');
        return
    }

    async createModulAjar(token: string, dto: CreateModulAjarDto) {
        // check mapel is exist
        await this.mapelRepository.findByIdOrThrow(dto.idMapel);
        // get decode payload jwt token
        const { idsRombel } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        await this.checkIsMingguHasUsed(dto.minggu, dto.idMapel, idsRombel[0]);
        const modulAjar = await this.modulAjarQuery.create(idsRombel[0], dto);
        if (!modulAjar) throw new BadRequestException('Modul Ajar gagal ditambahkan');
        return modulAjar
    }

    async updateById(token: string, id: string, dto: UpdateModulAjarDto) {
        // check modul ajar is exist
        const currModulAjar = await this.findByIdOrThrow(id);

        // check mapel is exist
        if (dto.idMapel && dto.idMapel !== currModulAjar.idMapel) await this.mapelRepository.findByIdOrThrow(dto.idMapel);

        // get decode payload jwt token
        const { idsRombel } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        if (dto.minggu && dto.minggu !== currModulAjar.minggu || dto.idMapel !== currModulAjar.idMapel) await this.checkIsMingguHasUsed(dto.minggu, dto.idMapel, idsRombel[0]);

        // update modul ajar
        const modulAjar = await this.modulAjarQuery.updateById(id, dto);
        if (!modulAjar) throw new BadRequestException('Modul Ajar gagal diupdate');
        return modulAjar
    }

    async delete(token: string, id: string) {
        // check modul ajar is exist
        const modulAjar = await this.findByIdOrThrow(id);

        // get decode payload jwt token
        const { idsRombel } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;

        if (modulAjar.idRombel !== idsRombel[0]) throw new BadRequestException('Akun tidak terdaftar di rombel ini');
        // delete modul ajar
        const isDeleted = await this.modulAjarQuery.deleteById(id);
        if (!isDeleted) throw new BadRequestException('Modul Ajar gagal dihapus');
        return isDeleted
    }
}