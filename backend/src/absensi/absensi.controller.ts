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
import { AbsensiService } from './absensi.service';
import { HttpHelper } from '../helpers/http-helper';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { CreateAbsensiDto } from './dto/create-absensi.dto';
import { BulkAbsensiByJadwalDto } from './dto/bulk-absensi-by-jadwal.dto';


@Controller('absensi')
export class AbsensiController {
    constructor(
        private readonly absensiService: AbsensiService,
        private readonly httpHelper: HttpHelper
    ) { }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Post()
    async create(@Body() dto: CreateAbsensiDto, @Res() res, @Request() req) {
        const result = await this.absensiService.create(req.headers.authorization, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result)
    }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Post('bulk/jadwal-ajar/:idJadwalAjar')
    async createMany(@Body() dto: BulkAbsensiByJadwalDto[], @Res() res, @Request() req, @Param('idJadwalAjar') idJadwalAjar) {
        const result = await this.absensiService.createMany(req.headers.authorization, idJadwalAjar, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result)
    }
}