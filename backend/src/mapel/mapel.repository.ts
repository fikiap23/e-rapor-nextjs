import { BadRequestException, Injectable } from '@nestjs/common';
import { MapelQuery } from '../prisma/queries/mapel/mapel.query';
import CreateMapelDto from './dto/create-mapel.dto';
import { UpdateMapelDto } from './dto/update-mapel.dto';

@Injectable()
export class MapelRepository {
    constructor(private readonly mapelQuery: MapelQuery) { }

    async findAll() {
        return await this.mapelQuery.findAll();
    }

    async findByIdOrThrow(id: string) {
        const mapel = await this.mapelQuery.findById(id);
        if (!mapel) throw new BadRequestException('Mapel tidak ditemukan');
        return mapel
    }

    async checkMapelNameExist(name: string) {
        const mapel = await this.mapelQuery.checkIsNameHasUsed(name);
        if (mapel) throw new BadRequestException('Mapel sudah terdaftar');
        return
    }


    async create(dto: CreateMapelDto) {
        try {
            // check mapel name exist
            await this.checkMapelNameExist(dto.name);
            const dataMapel = await this.mapelQuery.create(dto);
            if (!dataMapel) throw new BadRequestException('Mapel gagal ditambahkan');
            return dataMapel
        }
        catch (error) {
            throw error
        }
    }

    async update(id: string, dto: UpdateMapelDto) {
        try {
            // check mapel exist
            const mapel = await this.findByIdOrThrow(id);
            // check mapel name exist
            if (dto.name && dto.name !== mapel.name) await this.checkMapelNameExist(dto.name)
            const dataMapel = await this.mapelQuery.updateById(id, dto);
            if (!dataMapel) throw new BadRequestException('Mapel gagal diupdate');
            return dataMapel
        }
        catch (error) {
            throw error
        }
    }

    async delete(id: string) {
        try {
            // check mapel exist
            await this.findByIdOrThrow(id);
            const dataMapel = await this.mapelQuery.deleteById(id);
            if (!dataMapel) throw new BadRequestException('Mapel gagal dihapus');
            return dataMapel
        }
        catch (error) {
            throw error
        }
    }
}