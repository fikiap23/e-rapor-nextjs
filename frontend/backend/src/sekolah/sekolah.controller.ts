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
import { SekolahService } from './sekolah.service';
import { HttpHelper } from '../helpers/http-helper';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { CreateSekolahDto } from './dto/create-sekolah.dto';
import { UpdateSekolahDto } from './dto/update-sekolah.dto';


@Controller('sekolah')
export class SekolahController {
    constructor(
        private readonly sekolahService: SekolahService,
        private readonly httpHelper: HttpHelper
    ) { }

    @Post()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async create(@Body() dto: CreateSekolahDto, @Res() res) {
        const result = await this.sekolahService.create(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }

    @Put()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async update(@Body() dto: UpdateSekolahDto, @Res() res) {
        await this.sekolahService.update(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {});
    }

    @Get()
    async findOne(@Res() res) {
        const result = await this.sekolahService.findOne();
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }
}