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
    Request,
} from '@nestjs/common';
import { JadwalAjarService } from './jadwal-ajar.service';
import { HttpHelper } from '../helpers/http-helper';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { CreateJadwalAjarDto } from './dto/create-jadwal-ajar.dto';
import { UpdateJadwalAjarDto } from './dto/update-jadwal-ajar.dto';


@Controller('jadwal-ajar')
export class JadwalAjarController {
    constructor(
        private readonly jadwalAjarService: JadwalAjarService,
        private readonly httpHelper: HttpHelper
    ) { }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Post()
    async create(@Body() dto: CreateJadwalAjarDto, @Res() res, @Request() req) {
        const result = await this.jadwalAjarService.createJadwalAjar(req.headers.authorization, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result)
    }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Put(':id')
    async update(@Body() dto: UpdateJadwalAjarDto, @Res() res, @Request() req, @Param('id') id) {
        await this.jadwalAjarService.updateById(req.headers.authorization, id, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {})
    }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Delete(':id')
    async delete(@Res() res, @Request() req, @Param('id') id) {
        await this.jadwalAjarService.deleteById(req.headers.authorization, id)
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {})
    }

    @Get()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.GURU)
    async findAll(@Res() res) {
        const result = await this.jadwalAjarService.findAll();
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get('modul-ajar/:idModulAjar')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.GURU)
    async findManyByModul(@Res() res, @Param('idModulAjar') idModulAjar) {
        const result = await this.jadwalAjarService.findByIdModulAjar(idModulAjar);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.GURU)
    async findOne(@Res() res, @Param('id') id) {
        const result = await this.jadwalAjarService.findByIdOrThrow(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }
}