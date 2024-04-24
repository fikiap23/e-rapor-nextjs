import { BadRequestException, Injectable } from '@nestjs/common';
import { MuridQuery } from '../prisma/queries/murid/murid.query';
import CreateMuridDto from './dto/create-murid.dto';
import { UpdateMuridDto } from './dto/update-murid.dto';
import { RombelRepository } from '../rombel/rombel.repository';
import { _validateFile, createFileImageHelper, deleteFileImageHelper, getCustomFilename } from '../helpers/helper';
import BulkMuridDto from './dto/bulk-muri.dto';


@Injectable()
export class MuridRepository {
    constructor(private readonly muridQuery: MuridQuery, private readonly rombelRepository: RombelRepository) { }

    async findByIdOrThrow(id: string) {
        const murid = await this.muridQuery.findById(id);
        if (!murid) {
            throw new BadRequestException('Anak belum terdaftar');
        }
        return murid;
    }

    async findByNisOrThrow(nis: string) {
        const murid = await this.muridQuery.findByNis(nis);
        if (!murid) {
            throw new BadRequestException('Anak belum terdaftar');
        }
        return murid;
    }

    async isNisHasUsed(nis: string) {
        const isNisHasUsed = await this.muridQuery.checkIsNisHasUsed(nis);
        if (isNisHasUsed) throw new BadRequestException('NIS sudah terdaftar');
        return
    }

    async create(dto: CreateMuridDto, file: Express.Multer.File) {
        // return file
        if (dto.idRombel) {
            // check rombel exist
            await this.rombelRepository.findRombelByIdOrThrow(dto.idRombel);
        }
        // check is nis has been used
        await this.isNisHasUsed(dto.nis);

        let urlFileFoto: string;
        // check if new file exists
        if (file) {
            _validateFile(
                `Foto Murid`,
                file,
                ['.jpeg', '.jpg', '.png'],
                1,
            );

            urlFileFoto = getCustomFilename(dto.nis, file);
            // store file
            await createFileImageHelper(
                file,
                `./public/foto/murid`,
                urlFileFoto,
            );
            dto.foto = `foto/murid/${urlFileFoto}`;
        }
        return await this.muridQuery.create(dto);
    }


    async updateById(id: string, dto: UpdateMuridDto, file: Express.Multer.File) {
        const murid = await this.findByIdOrThrow(id);
        if (dto.idRombel && dto.idRombel !== murid.idRombel) {
            // check rombel exist
            const rombel = await this.rombelRepository.findRombelByIdOrThrow(dto.idRombel);
            // check kuota rombel sudah penuh
            if (rombel.kuota - rombel.coutMurid <= 0) throw new BadRequestException('Kuota rombel sudah penuh');
        }

        if (dto.nis && murid.nis !== dto.nis) {
            await this.isNisHasUsed(dto.nis);
        }

        let urlFileFoto: string;
        // check if new file exists
        if (file) {
            _validateFile(
                `Foto Murid`,
                file,
                ['.jpeg', '.jpg', '.png'],
                1,
            );

            urlFileFoto = getCustomFilename(murid.nis, file);
            if (murid.foto) {
                await deleteFileImageHelper(
                    `./public`,
                    murid.foto,
                );
            }
            // store file
            await createFileImageHelper(
                file,
                `./public/foto/murid`,
                urlFileFoto,
            );
            dto.foto = `foto/murid/${urlFileFoto}`;
        }

        return await this.muridQuery.updateById(id, dto)
    }

    async removeRombelById(id: string) {
        return await this.muridQuery.updateById(id, { idRombel: null })
    }

    async deleteById(id: string) {
        const murid = await this.findByIdOrThrow(id);
        if (murid.foto) {
            await deleteFileImageHelper(
                `./public`,
                murid.foto,
            );
        }
        return await this.muridQuery.deleteById(murid.id)
    }

    async findAll() {
        return await this.muridQuery.findAll()
    }

    async findByNullRombel() {
        return await this.muridQuery.findByNullIdRombel()
    }

    async createMany(data: BulkMuridDto[]) {
        return await this.muridQuery.createMany(data)
    }

    async getStudentsSemesterRombelByIdRombelSemesterGuru(id: string) {
        const murid = await this.muridQuery.getStudentsSemesterRombelByIdRombelSemesterGuru(id);
        if (!murid) {
            throw new BadRequestException('Data gagal dimuat');
        }
        return murid;
    }

    async findManyStudentByIdRombelSemesterGuru(id: string) {
        return await this.muridQuery.findStudentByIdRombelSemesterGuru(id);
    }
}