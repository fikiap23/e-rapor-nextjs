import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { HttpHelper } from '../helpers/http-helper';
import { Access, Roles } from '../auth/decorator';
import { TokenType } from '../helpers/helper';
import { RoleUser } from '@prisma/client';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';
import { AccessGuard, JwtGuard, RoleGuard } from '../auth/guard';

@Controller('teacher')
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    private readonly httpHelper: HttpHelper,
  ) {}

  // CREATE
  @Post()
  @UseGuards(JwtGuard, AccessGuard, RoleGuard)
  @Access(TokenType.FULL)
  @Roles(RoleUser.ADMIN)
  async create(@Body() dto: CreateTeacherDto, @Res() res) {
    await this.teacherService.createTeacher(dto);
    const successMessage = 'Teacher successfully created.';
    return this.httpHelper.formatResponse(res, HttpStatus.OK, {
      message: successMessage,
    });
  }

  // READ
  @Get('all')
  @UseGuards(JwtGuard, AccessGuard, RoleGuard)
  @Access(TokenType.FULL)
  @Roles(RoleUser.ADMIN, RoleUser.TEACHER, RoleUser.STUDENT)
  async findAll(@Res() res) {
    const result = await this.teacherService.findAllTeacher();
    if (!result || result.length === 0) {
      throw new NotFoundException('Empty Data');
    }
    return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
  }

  // UPDATE
  @Patch(':id')
  @UseGuards(JwtGuard, AccessGuard, RoleGuard)
  @Access(TokenType.FULL)
  @Roles(RoleUser.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTeacherDto,
    @Res() res,
  ) {
    try {
      const result = await this.teacherService.updateTeacher(id, dto);
      if (!result) {
        throw new NotFoundException(`Teacher with id ${id} not found.`);
      }
      return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return this.httpHelper.formatResponse(res, HttpStatus.NOT_FOUND, {
        message: error.message,
      });
    }
  }

  // READ ONE BY ID
  @Get(':id')
  @UseGuards(JwtGuard, AccessGuard, RoleGuard)
  @Access(TokenType.FULL)
  @Roles(RoleUser.ADMIN, RoleUser.TEACHER, RoleUser.STUDENT)
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const result = await this.teacherService.findOneTeacher(id);
      if (!result) {
        throw new NotFoundException(`Teacher with id ${id} not found.`);
      }
      return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return this.httpHelper.formatResponse(res, HttpStatus.NOT_FOUND, {
        message: error.message,
      });
    }
  }

  // DELETE BY ID
  @Delete(':id')
  @UseGuards(JwtGuard, AccessGuard, RoleGuard)
  @Access(TokenType.FULL)
  @Roles(RoleUser.ADMIN)
  async delete(@Param('id') id: string, @Res() res) {
    await this.teacherService.deleteTeacher(id);
    const successMessage = `Teacher with id ${id} successfully deleted`;
    return this.httpHelper.formatResponse(res, HttpStatus.OK, {
      message: successMessage,
    });
  }
}
