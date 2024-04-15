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
import { RaporService } from './rapor.service';
import { HttpHelper } from '../helpers/http-helper';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { CreateRaporDto } from './dto/create-rapor.dto';
import { UpdateRaporDto } from './dto/update-rapor.dto';
import { GetRaporDto } from './dto/get-rapor.dto';
import { GetRaporByIdRombelSemesterDto } from './dto/get-rapor-by-idRombel-semester.dto';


@Controller('rapor')
export class RaporController {
    constructor(
        private readonly raporService: RaporService,
        private readonly httpHelper: HttpHelper
    ) { }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Post()
    async create(@Body() dto: CreateRaporDto, @Res() res, @Request() req) {
        const result = await this.raporService.create(req.headers.authorization, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result)
    }

    @Post('read/murid-semester')
    async findBySemester(@Body() dto: GetRaporDto, @Res() res, @Request() req) {
        const result = await this.raporService.findByIdMuridAndSemesterOrThrow(dto)
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result)
    }

    @Get('murid/:idMurid')
    async findOne(@Res() res, @Param('idMurid') idMurid) {
        const result = await this.raporService.findByIdMurid(idMurid)
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Post('read/rombel-semester')
    async findByRombel(@Body() dto: GetRaporByIdRombelSemesterDto, @Res() res, @Request() req) {
        const result = await this.raporService.findByIdRombelAndSemester(dto)
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result)
    }


    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Put(':id')
    async update(@Body() dto: UpdateRaporDto, @Res() res, @Request() req, @Param('id') id) {
        await this.raporService.updateById(req.headers.authorization, id, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {})
    }

    @Get('print/:id')
    async printById(@Res() res, @Param('id') id) {
        const result = await this.raporService.printById(id)
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }
}