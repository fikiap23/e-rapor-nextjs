import { BadRequestException, Injectable } from '@nestjs/common';
import { GuruQuery } from '../prisma/queries/guru/guru.query';
import { AuthRepository } from '../auth/auth.repository';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import CreateGuruDto from './dto/create-guru.dto';
import { RoleEnum } from '../helpers/helper';
import { UpdateGuruDto } from './dto/update-guru.dto';
import { GuruQueryDto } from './dto/guru.query.dto';
import { UserQuery } from '../prisma/queries/user/user.query';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GuruRepository {
    constructor(
        private readonly guruQuery: GuruQuery,
        private readonly authRepository: AuthRepository,
        private readonly userQuery: UserQuery,
        private readonly userRepository: UserRepository
    ) { }

    async create(dto: CreateGuruDto) {
        try {
            // periksa apakah guru sudah ada
            await this.checkGuruExist(dto.nip)

            // buat akun guru
            let akunGuruDto: CreateUserDto = {
                username: dto.nip,
                password: dto.nip
            }
            if (dto.username && dto.password) {
                akunGuruDto = {
                    username: dto.username,
                    password: dto.password
                }
            }
            const akunGuru = await this.registerAkunGuru(akunGuruDto);

            // payload
            const payload = {
                nip: dto.nip,
                nama: dto.nama,
                jenisKelamin: dto.jenisKelamin,
            }

            // buat data guru
            const dataGuru = await this.guruQuery.create(akunGuru.id, payload);
            if (!dataGuru) throw new BadRequestException('Guru gagal ditambahkan');
            return dataGuru

        }
        catch (error) {
            throw error
        }
    }

    async findGuruByNipOrThrow(nip: string) {
        const guru = await this.guruQuery.findByNip(nip);
        if (!guru) throw new BadRequestException('Guru tidak ditemukan');
        return guru
    }

    async checkGuruExist(nip: string) {
        const guru = await this.guruQuery.findByNip(nip);
        if (guru) throw new BadRequestException('Guru sudah terdaftar');
        return null
    }

    async findGuruByIdOrThrow(id: string) {
        const guru = await this.guruQuery.findById(id);
        if (!guru) throw new BadRequestException('Guru tidak ditemukan');
        return guru
    }

    async updateByAdmin(id: string, dto: UpdateGuruDto) {
        // check guru exist
        await this.findGuruByIdOrThrow(id);

        // check nip exist
        const nipGuru = await this.guruQuery.findByNip(dto.nip);
        if (nipGuru && nipGuru.id !== id) throw new BadRequestException('NIP sudah terdaftar');

        if (dto.idUser) {
            if (dto.username && dto.password) {
                const salt = await bcrypt.genSalt();
                const hash = await bcrypt.hash(dto.password, salt);
                await this.userRepository.update(dto.idUser, {
                    username: dto.username,
                    password: hash
                })
            } else if (dto.username) {
                await this.userRepository.update(dto.idUser, {
                    username: dto.username
                })
            } else if (dto.password) {
                const salt = await bcrypt.genSalt();
                const hash = await bcrypt.hash(dto.password, salt);
                await this.userRepository.update(dto.idUser, {
                    password: hash
                })
            }
        }

        const payload = {
            nip: dto.nip,
            nama: dto.nama,
            jenisKelamin: dto.jenisKelamin,
        }

        return await this.guruQuery.updateById(id, payload)
    }

    findAllGuru(dto: GuruQueryDto) {
        return this.guruQuery.findAll(dto)
    }

    async deleteByAdmin(id: string) {
        // check guru exist
        const guru = await this.findGuruByIdOrThrow(id);
        return await this.userQuery.delete(guru.idUser)
    }

    async findAllRombelDiampu(token: string, status: string) {
        // decaode
        const { idGuru } = await this.authRepository.decodeJwtToken(token);
        return await this.guruQuery.findAllRombelDiampu(idGuru, status)
    }

    async getDashboardGuru(token: string) {
        const { idGuru } = await this.authRepository.decodeJwtToken(token);
        return await this.guruQuery.getDashboardGuru(idGuru)
    }

    /*
      |--------------------------------------------------------------------------
      | Helper guru function
      |--------------------------------------------------------------------------
      */

    async registerAkunGuru(dto: CreateUserDto) {
        const akunGuru = await this.authRepository.createUser(dto, RoleEnum.GURU);
        if (!akunGuru) throw new BadRequestException('Guru gagal ditambahkan');
        return akunGuru
    }
}