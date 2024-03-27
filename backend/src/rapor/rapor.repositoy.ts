import { BadRequestException, Injectable } from '@nestjs/common';
import { RaporQuery } from '../prisma/queries/rapor/rapor.query';
import { CreateRaporDto } from './dto/create-rapor.dto';
import { AuthRepository } from '../auth/auth.repository';
import { PayloadToken } from '../auth/type';
import { SekolahRepository } from '../sekolah/sekolah.repository';
import { MuridRepository } from '../murid/murid.repository';
import { SemesterRepository } from '../semester/semester.repository';
import { UpdateRaporDto } from './dto/update-rapor.dto';

@Injectable()
export class RaporRepository {
    constructor(
        private readonly raporQuery: RaporQuery,
        private readonly authRepository: AuthRepository,
        private readonly sekolaRepository: SekolahRepository,
        private readonly muridRepository: MuridRepository,
        private readonly semesterRepository: SemesterRepository
    ) { }

    async findByIdOrThrow(id: string) {
        const data = await this.raporQuery.findById(id);
        if (!data) throw new BadRequestException('Rapor tidak ditemukan');
        return data
    }

    async findByIdMuridAndSemesterOrThrow(idMurid: string, idSemester: string) {
        const data = await this.raporQuery.findByIdMuridAndSemester(idMurid, idSemester);
        if (data.length == 0) throw new BadRequestException('Rapor tidak ditemukan');
        return data
    }

    async findByIdMurid(idMurid: string) {
        await this.muridRepository.findByIdOrThrow(idMurid)
        return await this.raporQuery.findByIdMurid(idMurid)
    }

    async checkIsRaporExist(idMurid: string, idSemester: string) {
        const rapor = await this.raporQuery.findByIdMuridAndSemester(idMurid, idSemester);
        if (rapor) throw new BadRequestException('Rapor sudah ada');
        return
    }

    async create(token: string, dto: CreateRaporDto) {
        try {
            const sekolah = await this.sekolaRepository.findSekolah()
            const { idsRombel, idGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;

            // check semester and murid exist
            await this.semesterRepository.findByIdOrThrow(dto.idSemester);
            const murid = await this.muridRepository.findByIdOrThrow(dto.idMurid);

            // check rapor exist
            await this.checkIsRaporExist(dto.idMurid, dto.idSemester);

            if (murid.idRombel !== idsRombel[0]) throw new BadRequestException('Akun tidak terdaftar di rombel ini');

            const data = await this.raporQuery.create(sekolah.id, idsRombel[0], idGuru, dto);
            if (!data) throw new BadRequestException('Rapor gagal ditambahkan');
            return data
        } catch (BadRequestException) {
            throw BadRequestException
        }
    }

    async update(token: string, id: string, dto: UpdateRaporDto) {
        const rapor = await this.findByIdOrThrow(id);
        const { idsRombel } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;

        if (rapor.idRombel !== idsRombel[0]) throw new BadRequestException('Akun tidak terdaftar di rombel ini');

        return await this.raporQuery.updateById(id, dto);
    }

}