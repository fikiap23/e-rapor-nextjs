import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { HttpHelper } from '../helpers/http-helper';
import { Access, Roles } from '../auth/decorator';
import { TokenType } from '../helpers/helper';
import { RoleUser } from '@prisma/client';
import { AccessGuard, JwtGuard, RoleGuard } from '../auth/guard';

@Controller('student')
export class StudentController {
  constructor(
    private studentService: StudentService,
    private readonly httpHelper: HttpHelper,
  ) {}

  // READ
  @Get('all')
  @UseGuards(JwtGuard, AccessGuard, RoleGuard)
  @Access(TokenType.FULL)
  @Roles(RoleUser.ADMIN, RoleUser.TEACHER, RoleUser.STUDENT)
  async findAll(@Res() res) {
    const result = await this.studentService.findAllStudent();
    if (!result || result.length === 0) {
      throw new NotFoundException('Empty Data');
    }
    return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
  }
}
