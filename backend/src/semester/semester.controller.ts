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
import { HttpHelper } from '../helpers/http-helper';
import { SemesterService } from './semester.service';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';


@Controller('semester')
export class SemesterController {
    constructor(
        private readonly semesterService: SemesterService,
        private readonly httpHelper: HttpHelper
    ) { }

    @Post()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async create(@Body() dto: CreateSemesterDto, @Res() res) {
        const result = await this.semesterService.create(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }

    @Put(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async update(@Body() dto: UpdateSemesterDto, @Res() res, @Param('id') id) {
        await this.semesterService.updateById(id, dto);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {});
    }

    @Delete(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async delete(@Res() res, @Param('id') id) {
        await this.semesterService.deleteById(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {});
    }

    @Get()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async findAll(@Res() res) {
        const result = await this.semesterService.findAll();
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async findOne(@Res() res, @Param('id') id) {
        const result = await this.semesterService.findOne(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }
}