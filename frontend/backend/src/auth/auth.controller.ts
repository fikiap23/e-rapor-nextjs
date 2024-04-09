import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  Headers,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpHelper } from '../helpers/http-helper';
import { AccessGuard, JwtGuard, RoleGuard } from './guard';
import { Access, Roles } from './decorator';
import { Role } from '@prisma/client';
import { TokenType } from '../helpers/helper';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express'
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly httpHelper: HttpHelper,
  ) { }

  @Post('login')
  async login(@Body() dto: LoginUserDto, @Res() res) {
    {
      const token = await this.authService.login(dto);
      return res
        .status(HttpStatus.OK)
        .json(token);
    }
  }

  @UseGuards(JwtGuard, AccessGuard)
  @Access(TokenType.FULL)
  @Patch('password/update')
  async updateForgotPassword(@Req() req: Request, @Body('newPassword') newPassword: string, @Res() res) {
    const result = await this.authService.updateForgotPassword(req.headers.authorization, newPassword)
    return this.httpHelper.formatResponse(res, HttpStatus.OK, result)
  }

  /*
    |--------------------------------------------------------------------------
    | Auth admin enpoint
    |--------------------------------------------------------------------------
    */

  @Post('admin/register')
  async adminRegister(@Body() dto: CreateUserDto) {
    return await this.authService.adminRegister(dto);
  }

  /*
   |--------------------------------------------------------------------------
   | Auth helper function
   |--------------------------------------------------------------------------
   */

  @UseGuards(JwtGuard, AccessGuard)
  @Access(TokenType.FULL)
  @Post('refresh/token')
  refreshJwtToken(@Req() req: Request) {
    return this.authService.refreshJwtToken(req.headers.authorization)
  }
}
