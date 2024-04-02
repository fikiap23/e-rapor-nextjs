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
import { CpTpService } from './cp-tp.service';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { CreateCPDto } from './dto/create-cp.dto';
import { HttpHelper } from '../helpers/http-helper';
import { CreateTPDto } from './dto/create-tp.dto';


@Controller('silabus')
export class CpTpController {
    constructor(
        private readonly cpTpService: CpTpService,
        private readonly httpHelper: HttpHelper
    ) { }

    /*
   |--------------------------------------------------------------------------
   | Endpoint untuk Capaian Pembelajaran(CP)
   |--------------------------------------------------------------------------
   */

    @Post('cp')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async createCp(@Body() dto: CreateCPDto, @Res() res) {
        const result = await this.cpTpService.createCp(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }

    @Put("cp")
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async updateCp(@Body() dto: Partial<CreateCPDto>, @Res() res) {
        await this.cpTpService.updateCp(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {});
    }

    @Get("cp")
    async findOne(@Res() res) {
        const result = await this.cpTpService.findCp();
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get("cp/with-tp")
    async findCpWithTp(@Res() res) {
        const result = await this.cpTpService.findCpWithTp();
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    /*
     |--------------------------------------------------------------------------
     | Endpoint untuk Capaian Pembelajaran(CP)
     |--------------------------------------------------------------------------
     */

    @Post('tp')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async createTp(@Body() dto: CreateTPDto, @Res() res) {
        const result = await this.cpTpService.createTp(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }

    @Put("tp/:id")
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async updateTp(@Body() dto: Partial<CreateTPDto>, @Res() res, @Param('id') id) {
        await this.cpTpService.updateTp(id, dto);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {});
    }

    @Delete("tp/:id")
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async deleteTp(@Res() res, @Param('id') id) {
        await this.cpTpService.deleteTp(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {});
    }

    @Get("tp")
    async findAll(@Res() res) {
        const result = await this.cpTpService.findAllTp();
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get("tp/:id")
    async findOneTp(@Res() res, @Param('id') id) {
        const result = await this.cpTpService.findTpById(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }
}