import { Injectable } from '@nestjs/common';
import { RaporQuery } from '../prisma/queries/rapor/rapor.query';
import { CreateRaporDto } from './dto/create-rapor.dto';
import { AuthRepository } from '../auth/auth.repository';
import { PayloadToken } from '../auth/type';
import { SekolahRepository } from '../sekolah/sekolah.repository';
import { MuridRepository } from '../murid/murid.repository';
import { SemesterRepository } from '../semester/semester.repository';

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
        if (!data) throw new Error('Rapor tidak ditemukan');
        return data
    }

    async create(token: string, dto: CreateRaporDto) {
        try {
            const sekolah = await this.sekolaRepository.findSekolah()
            const { idsRombel, idGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;

            // check semester and murid exist
            await this.semesterRepository.findByIdOrThrow(dto.idSemester);
            const murid = await this.muridRepository.findByIdOrThrow(dto.idMurid);

            if (murid.idRombel !== idsRombel[0]) throw new Error('Akun tidak terdaftar di rombel ini');

            const data = await this.raporQuery.create(sekolah.id, idsRombel[0], idGuru, dto);
            if (!data) throw new Error('Rapor gagal ditambahkan');
            return data
        } catch (error) {
            throw error
        }
    }
}