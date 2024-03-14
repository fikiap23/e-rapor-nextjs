import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { HttpHelper } from '../helpers/http-helper';
import { CreateSubjectDto } from './dto/subject.dto';
import { Access, Roles } from '../auth/decorator';
import { TokenType } from '../helpers/helper';
import { RoleUser } from '@prisma/client';
import { AccessGuard, JwtGuard, RoleGuard } from '../auth/guard';

@Controller('subject')
export class SubjectController {
  constructor(
    private subjectService: SubjectService,
    private readonly httpHelper: HttpHelper,
  ) {}

  @Post()
  @UseGuards(JwtGuard, AccessGuard, RoleGuard)
  @Access(TokenType.FULL)
  @Roles(RoleUser.ADMIN)
  async create(@Body() dto: CreateSubjectDto, @Res() res) {
    const result = await this.subjectService.create(dto);
    return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
  }

  @Get()
  @UseGuards(JwtGuard, AccessGuard, RoleGuard)
  @Access(TokenType.FULL)
  @Roles(RoleUser.ADMIN, RoleUser.TEACHER, RoleUser.STUDENT)
  async findAll(@Res() res) {
    const result = await this.subjectService.findAll();
    return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
  }

  @Get(':id')
  @UseGuards(JwtGuard, AccessGuard, RoleGuard)
  @Access(TokenType.FULL)
  @Roles(RoleUser.ADMIN, RoleUser.TEACHER, RoleUser.STUDENT)
  async findOne(@Res() res, @Param('id') id: string) {
    const result = await this.subjectService.findOne(id);
    return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
  }
}
