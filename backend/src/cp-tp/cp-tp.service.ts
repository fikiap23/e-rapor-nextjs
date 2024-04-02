import { Injectable } from '@nestjs/common';
import { CpTpRepository } from './cp-tp.repository';
import { CreateCPDto } from './dto/create-cp.dto';
import { CreateTPDto } from './dto/create-tp.dto';

@Injectable()
export class CpTpService {
    constructor(private readonly cpTpRepository: CpTpRepository) { }


    /*
    |--------------------------------------------------------------------------
    | Service untuk Capaian Pembelajaran(CP)
    |--------------------------------------------------------------------------
    */

    async createCp(dto: CreateCPDto) {
        return await this.cpTpRepository.createCP(dto);
    }

    async updateCp(dto: Partial<CreateCPDto>) {
        return await this.cpTpRepository.updateCp(dto);
    }

    async findCp() {
        return await this.cpTpRepository.findOneCpOrThrow();
    }

    async findCpWithTp() {
        return await this.cpTpRepository.findCpWithTp();
    }

    /*
   |--------------------------------------------------------------------------
   | Service untuk Tujuan Pembelajaran(TP)
   |--------------------------------------------------------------------------
   */

    async createTp(dto: CreateTPDto) {
        return await this.cpTpRepository.createTP(dto);
    }

    async updateTp(id: string, dto: Partial<CreateTPDto>) {
        return await this.cpTpRepository.updateTpById(id, dto);
    }

    async deleteTp(id: string) {
        return await this.cpTpRepository.deleteTpById(id);
    }

    async findAllTp() {
        return await this.cpTpRepository.findAllTp();
    }

    async findTpById(id: string) {
        return await this.cpTpRepository.findTpByIdOrThrow(id);
    }

}