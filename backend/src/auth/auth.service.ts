import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { AuthRepository } from './auth.repository';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository
  ) { }



  async login(dto: LoginUserDto) {
    return await this.authRepository.login(dto);
  }

  async refreshJwtToken(refreshToken: string) {
    return await this.authRepository.refreshJwtToken(refreshToken);
  }

  async updateForgotPassword(token: string, password: string) {
    if (!password) throw new BadRequestException('newPassword tidak boleh kosong');
    return await this.authRepository.updateForgotPassword(token, password);
  }

  /*
    |--------------------------------------------------------------------------
    | Auth admin function
    |--------------------------------------------------------------------------
    */
  async adminRegister(dto: CreateUserDto) {
    return await this.authRepository.adminRegister(dto);
  }

}
