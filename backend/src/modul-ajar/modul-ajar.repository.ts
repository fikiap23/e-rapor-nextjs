import { BadRequestException, Injectable } from '@nestjs/common';
import { ModulAjarQuery } from '../prisma/queries/modul-ajar/modul-ajar.query';
import { AuthRepository } from '../auth/auth.repository';
import { PayloadToken } from '../auth/type';
import CreateModulAjarDto from './dto/create-modul-ajar.dto';
import { UpdateModulAjarDto } from './dto/update-modul-ajar.dto';
import { CpTpRepository } from '../cp-tp/cp-tp.repository';

@Injectable()
export class ModulAjarRepository {
    constructor(
        private readonly modulAjarQuery: ModulAjarQuery,
        private readonly authRepository: AuthRepository,
        private readonly cpTpRepository: CpTpRepository
    ) { }

    async findAllModulAjar(token: string) {
        // ! nanti dibenarkan
        // get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        return await this.modulAjarQuery.findByIdRombel(idsRombelSemesterGuru[0]);
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

    async checkIsMingguHasUsed(minggu: number, idTujuanPembelajaran: string, idsRombelSemesterGuru: string[]) {
        ;
        const modulAjar = await this.modulAjarQuery.checkIsMingguHasUsedByIdsRombelSemesterGuru(minggu, idTujuanPembelajaran, idsRombelSemesterGuru);
        if (modulAjar) throw new BadRequestException('Minggu ini sudah ada modul ajar');
        return
    }

    async createModulAjar(token: string, dto: CreateModulAjarDto) {
        // check mapel is exist
        await this.cpTpRepository.findTpByIdOrThrow(dto.idTujuanPembelajaran);
        // get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        await this.checkIsMingguHasUsed(dto.minggu, dto.idTujuanPembelajaran, idsRombelSemesterGuru);
        const modulAjar = await this.modulAjarQuery.create(dto);
        if (!modulAjar) throw new BadRequestException('Modul Ajar gagal ditambahkan');
        return modulAjar
    }

    async updateById(token: string, id: string, dto: UpdateModulAjarDto) {
        // check modul ajar is exist
        const currModulAjar = await this.findByIdOrThrow(id);

        // check mapel is exist
        if (dto.idTujuanPembelajaran && dto.idTujuanPembelajaran !== currModulAjar.idTujuanPembelajaran) await this.cpTpRepository.findTpByIdOrThrow(dto.idTujuanPembelajaran);

        // get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        if (dto.minggu && dto.minggu !== currModulAjar.minggu || dto.idTujuanPembelajaran !== currModulAjar.idTujuanPembelajaran) await this.checkIsMingguHasUsed(dto.minggu, dto.idTujuanPembelajaran, idsRombelSemesterGuru);

        // update modul ajar
        const modulAjar = await this.modulAjarQuery.updateById(id, dto);
        if (!modulAjar) throw new BadRequestException('Modul Ajar gagal diupdate');
        return modulAjar
    }

    async delete(token: string, id: string) {
        // check modul ajar is exist
        const modulAjar = await this.findByIdOrThrow(id);

        // get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;

        if (!idsRombelSemesterGuru.includes(modulAjar.idRombelSemesterGuru)) throw new BadRequestException('Akun tidak terdaftar di rombel ini');
        // delete modul ajar
        const isDeleted = await this.modulAjarQuery.deleteById(id);
        if (!isDeleted) throw new BadRequestException('Modul Ajar gagal dihapus');
        return isDeleted
    }
}