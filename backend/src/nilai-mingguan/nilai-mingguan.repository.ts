import { BadRequestException, Injectable } from '@nestjs/common';
import { NilaiMingguanQuery } from '../prisma/queries/nilai-mingguan/nilai-mingguan.query';
import { CreatePenilaianMingguanDto } from './dto/create-nilai-mingguan.dto';
import { AuthRepository } from '../auth/auth.repository';
import { PayloadToken } from '../auth/type';
import { MuridRepository } from '../murid/murid.repository';
import { UpdatePenilaianMingguanDto } from './dto/update-nilai-mingguan.dto';
import { RombelQuery } from '../prisma/queries/rombel/rombel.query';
import { CpTpRepository } from '../cp-tp/cp-tp.repository';
import { CreateAnalisisPenilaianType } from '../prisma/queries/nilai-mingguan/interfaces/analisisPenilaian';

@Injectable()
export class NilaiMingguanRepository {
    constructor(
        private readonly nilaiMingguanQuery: NilaiMingguanQuery,
        private readonly cptpRepository: CpTpRepository,
        private readonly authRepository: AuthRepository,
        private readonly muridRepository: MuridRepository,
        private readonly rombelQuery: RombelQuery
    ) { }

    async findAll() {
        return await this.nilaiMingguanQuery.findAll();
    }

    async findByIdOrThrow(id: string) {
        const nilaiMingguan = await this.nilaiMingguanQuery.findById(id);
        if (!nilaiMingguan) throw new BadRequestException('Nilai Mingguan tidak ditemukan');
        return nilaiMingguan
    }

    async findByIdWithTp(id: string) {
        const nilaiMingguan = await this.nilaiMingguanQuery.findByIdWithTp(id);
        if (!nilaiMingguan) throw new BadRequestException('Nilai Mingguan tidak ditemukan');
        return nilaiMingguan
    }

    async create(token: string, dto: CreatePenilaianMingguanDto) {
        // get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;

        const rombelSemesterGuru = await this.rombelQuery.findRombelSemesterGuruByIdOrThrow(dto.idRombelSemesterGuru);

        // check modul ajar exist
        await this.cptpRepository.findTpByIdOrThrow(dto.idTujuanPembelajaran);

        if (!idsRombelSemesterGuru.includes(dto.idRombelSemesterGuru)) throw new BadRequestException('Akun tidak terdaftar di rombel ini');

        // check murid exist
        const murid = await this.muridRepository.findByIdOrThrow(dto.idMurid);
        if (rombelSemesterGuru.idRombel !== murid.idRombel) throw new BadRequestException('Akun tidak terdaftar di rombel ini');

        return await this.nilaiMingguanQuery.create(dto)
    }

    async updateById(token: string, id: string, dto: UpdatePenilaianMingguanDto) {
        // get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        if (dto.idMurid && dto.idTujuanPembelajaran) throw new BadRequestException('Tidak boleh memasukkan idMurid dan idModulAjar');
        const nilaiMingguan = await this.findByIdWithTp(id);

        if (!idsRombelSemesterGuru.includes(nilaiMingguan.idRombelSemesterGuru)) throw new BadRequestException('Akun tidak terdaftar di rombel ini');
        return await this.nilaiMingguanQuery.updateById(id, dto)
    }

    async deleteById(token: string, id: string) {
        // get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        const nilaiMingguan = await this.findByIdWithTp(id);
        if (!idsRombelSemesterGuru.includes(nilaiMingguan.idRombelSemesterGuru)) throw new BadRequestException('Akun tidak terdaftar di rombel ini');
        return await this.nilaiMingguanQuery.deleteById(id)
    }

    async findStudentByIdRombelSemesterGuru(idRombelSemesterGuru: string, idTujuanPembelajaran: string) {
        return await this.nilaiMingguanQuery.findStudentByIdRombelSemesterGuruAndIdTp(idRombelSemesterGuru, idTujuanPembelajaran);
    }

    async createStaticAnalisisPenilaian(token: string, idRombelSemesterGuru: string, idMurid: string) {
        // get decode payload jwt token
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        if (!idsRombelSemesterGuru.includes(idRombelSemesterGuru)) throw new BadRequestException('Akun tidak terdaftar di rombel ini');
        await this.muridRepository.findByIdOrThrow(idMurid);
        await this.rombelQuery.findRombelSemesterGuruByIdOrThrow(idRombelSemesterGuru);
        const data = await this.nilaiMingguanQuery.printPenilaianByIdRombelSemesterGuruAndIdMurid(idRombelSemesterGuru, idMurid);
        const payload: CreateAnalisisPenilaianType = {
            idMurid: idMurid,
            idRombelSemesterGuru: idRombelSemesterGuru,
            nama: data.murid.nama,
            nis: data.murid.nis,
            kelompokUsia: data.kelompokUsia,
            namaRombel: data.namaRombel,
            namaGuru: data.namaGuru,
            nipGuru: data.nipGuru,
            namaKapsek: data.namaKapsek,
            nipKapsek: data.nipKapsek,
            namaSekolah: data.namaSekolah,
            semester: data.semester,
            penilaian: data.penilaian
        }
        return await this.nilaiMingguanQuery.createStaticAnalisisPenilaian(payload);
    }

    async createStaticAnalisisPenilaianByIdRombelSemesterGuru(idRombelSemesterGuru: string, idMurid: string) {
        await this.muridRepository.findByIdOrThrow(idMurid);
        await this.rombelQuery.findRombelSemesterGuruByIdOrThrow(idRombelSemesterGuru);
        const data = await this.nilaiMingguanQuery.printPenilaianByIdRombelSemesterGuruAndIdMurid(idRombelSemesterGuru, idMurid);
        const payload: CreateAnalisisPenilaianType = {
            idMurid: idMurid,
            idRombelSemesterGuru: idRombelSemesterGuru,
            nama: data.murid.nama,
            nis: data.murid.nis,
            kelompokUsia: data.kelompokUsia,
            namaRombel: data.namaRombel,
            namaGuru: data.namaGuru,
            nipGuru: data.nipGuru,
            namaKapsek: data.namaKapsek,
            nipKapsek: data.nipKapsek,
            namaSekolah: data.namaSekolah,
            semester: data.semester,
            penilaian: data.penilaian
        }
        return await this.nilaiMingguanQuery.createStaticAnalisisPenilaian(payload);
    }
}