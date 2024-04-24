import { Injectable } from '@nestjs/common';
import { MuridRepository } from './murid.repository';
import CreateMuridDto from './dto/create-murid.dto';
import { UpdateMuridDto } from './dto/update-murid.dto';
import BulkMuridDto from './dto/bulk-muri.dto';

@Injectable()
export class MuridService {
    constructor(private readonly muridRepository: MuridRepository) { }

    async create(dto: CreateMuridDto, file: Express.Multer.File) {
        return await this.muridRepository.create(dto, file);
    }

    async updateById(id: string, dto: UpdateMuridDto, file: Express.Multer.File) {
        return await this.muridRepository.updateById(id, dto, file);
    }

    async deleteById(id: string) {
        return await this.muridRepository.deleteById(id);
    }

    async findAll() {
        return await this.muridRepository.findAll();
    }

    async findOne(id: string) {
        return await this.muridRepository.findByIdOrThrow(id);
    }

    async findByNullRombel() {
        return await this.muridRepository.findByNullRombel();
    }

    async removeRombelById(id: string) {
        return await this.muridRepository.removeRombelById(id);
    }

    async createMany(data: BulkMuridDto[]) {
        return await this.muridRepository.createMany(data);
    }

    async getStudentsSemesterRombelByIdRombelSemesterGuru(id: string) {
        return await this.muridRepository.getStudentsSemesterRombelByIdRombelSemesterGuru(id);
    }

    async findManyStudentByIdRombelSemesterGuru(idRombelSemesterGuru: string) {
        return await this.muridRepository.findManyStudentByIdRombelSemesterGuru(idRombelSemesterGuru);
    }

    async findOneStudentByIdRombelSemesterGuruAndIdMurid(id: string, idMurid: string) {
        return await this.muridRepository.findOneStudentByIdRombelSemesterGuruAndIdMurid(id, idMurid);
    }
}