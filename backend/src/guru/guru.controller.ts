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
    Req,
} from '@nestjs/common';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator';
import CreateGuruDto from './dto/create-guru.dto';
import { GuruService } from './guru.service';
import { HttpHelper } from '../helpers/http-helper';
import { GuruQueryDto } from './dto/guru.query.dto';


@Controller('guru')
export class GuruController {
    constructor(private readonly guruService: GuruService, private readonly httpHelper: HttpHelper) { }

    /*
    |--------------------------------------------------------------------------
    | POST REQUEST FUNCTIONS
    |--------------------------------------------------------------------------
    */
    @Post()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async create(@Body() dto: CreateGuruDto, @Res() res) {
        const result = await this.guruService.create(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }

    /*
     |--------------------------------------------------------------------------
     | PUT REQUEST FUNCTIONS
     |--------------------------------------------------------------------------
     */
    @Put('bypass/status/:id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async updateStatusByAdmin(@Param('id') id: string, @Body() dto: CreateGuruDto, @Res() res) {
        const result = await this.guruService.updateByAdmin(id, dto);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Put('bypass/:id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async updateByAdmin(@Param('id') id: string, @Body() dto: CreateGuruDto, @Res() res) {
        const result = await this.guruService.updateByAdmin(id, dto);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Put(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.GURU)
    async update(@Param('id') id: string, @Body() dto: CreateGuruDto, @Res() res, @Req() req) {

    }

    /*
    |--------------------------------------------------------------------------
    | GET REQUEST FUNCTIONS
    |--------------------------------------------------------------------------
    */

    @Get()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.GURU)
    async findAll(@Res() res, @Query() dto: GuruQueryDto) {
        const result = await this.guruService.findAll(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }


    @Get(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.GURU)
    async findOne(@Res() res, @Param('id') id: string) {
        const result = await this.guruService.findOne(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE REQUEST FUNCTIONS
    |--------------------------------------------------------------------------
    */

    @Delete(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async delete(@Res() res, @Param('id') id: string) {
        await this.guruService.deleteByAdmin(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {});
    }

}