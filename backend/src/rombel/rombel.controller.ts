import {
    Body,
    Controller,
    Get,
    Put,
    HttpStatus,
    Param,
    Post,
    Res,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { CreateRombelDto } from './dto/create-rombel.dto';
import { RombelService } from './rombel.service';
import { HttpHelper } from '../helpers/http-helper';
import { CreateKategoriRombelDto } from './dto/create-kategori-rombel.dto';
import { UpdatKategoriRombelDto } from './dto/update-kategori-rombel.dto';
import { UpdateRombelDto } from './dto/update-rombel.dto';


@Controller('rombel')
export class RombelController {
    constructor(private readonly rombelService: RombelService, private readonly httpHelper: HttpHelper) { }

    /*
    |--------------------------------------------------------------------------
    | Rombel Endpoints
    |--------------------------------------------------------------------------
  */
    @Post()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async create(@Body() dto: CreateRombelDto, @Res() res) {
        const result = await this.rombelService.createRombel(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }

    @Put(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async update(@Body() dto: UpdateRombelDto, @Param('id') id, @Res() res) {
        const result = await this.rombelService.updateRombel(id, dto);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.GURU)
    async findAllRombel(@Res() res) {
        const result = await this.rombelService.findAllRombel();
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.GURU)
    async findOneRombel(@Res() res, @Param('id') id) {
        const result = await this.rombelService.findOneRombel(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    /*
    |--------------------------------------------------------------------------
    | Kategori Rombel Endpoints
    |--------------------------------------------------------------------------
    */

    @Post('kategori')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async createKategori(@Body() dto: CreateKategoriRombelDto, @Res() res) {
        const result = await this.rombelService.createKategoriRombel(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }

    @Put('kategori/:id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async updateKategori(@Body() dto: UpdatKategoriRombelDto, @Param('id') id, @Res() res) {
        const result = await this.rombelService.updateKategoriRombel(id, dto);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get('kategori')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.GURU)
    async findAllKategori(@Res() res) {
        const result = await this.rombelService.findAllKategoriRombel();
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get('kategori/:id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.GURU)
    async findOneKategoriRombel(@Res() res, @Param('id') id) {
        const result = await this.rombelService.findOneKategoriRombel(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }
}