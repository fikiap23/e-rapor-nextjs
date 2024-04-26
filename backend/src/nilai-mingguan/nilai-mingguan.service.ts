import { Injectable } from '@nestjs/common';
import { NilaiMingguanRepository } from './nilai-mingguan.repository';
import { CreatePenilaianMingguanDto } from './dto/create-nilai-mingguan.dto';
import { UpdatePenilaianMingguanDto } from './dto/update-nilai-mingguan.dto';
import { NilaiMingguanQuery } from '../prisma/queries/nilai-mingguan/nilai-mingguan.query';

@Injectable()
export class NilaiMingguanService {
    constructor(private readonly nilaiMingguanRepository: NilaiMingguanRepository, private readonly nilaiMingguanQuery: NilaiMingguanQuery) { }

    async findAll() {
        return await this.nilaiMingguanRepository.findAll();
    }

    async findOne(id: string) {
        return await this.nilaiMingguanRepository.findByIdOrThrow(id);
    }

    async create(token: string, dto: CreatePenilaianMingguanDto) {
        return await this.nilaiMingguanRepository.create(token, dto);
    }

    async updateById(token: string, id: string, dto: UpdatePenilaianMingguanDto) {
        return await this.nilaiMingguanRepository.updateById(token, id, dto);
    }

    async deleteById(token: string, id: string) {
        return await this.nilaiMingguanRepository.deleteById(token, id);
    }

    async findStudentByIdRombelSemesterGuruAndIdTp(idRombelSemesterGuru: string, idTujuanPembelajaran: string) {
        return await this.nilaiMingguanRepository.findStudentByIdRombelSemesterGuru(idRombelSemesterGuru, idTujuanPembelajaran);
    }

    async printPenilaianByIdRombelSemesterGuruAndIdTp(idRombelSemesterGuru: string, idTujuanPembelajaran: string) {
        return await this.nilaiMingguanQuery.printPenilaianByIdRombelSemesterGuruAndIdTp(idRombelSemesterGuru, idTujuanPembelajaran);
    }

    async printPenilaianByIdRombelSemesterGuruAndIdMurid(idRombelSemesterGuru: string, idMurid: string) {
        return await this.nilaiMingguanQuery.printPenilaianByIdRombelSemesterGuruAndIdMurid(idRombelSemesterGuru, idMurid);
    }

    async createStaticAnalisisPenilaian(token: string, idRombelSemesterGuru: string, idMurid: string) {
        return await this.nilaiMingguanRepository.createStaticAnalisisPenilaian(token, idRombelSemesterGuru, idMurid);
    }
}