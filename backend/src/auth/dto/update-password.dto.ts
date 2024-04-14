import { IsNotEmpty, IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { RoleEnum } from '../../helpers/helper';
import { StatusAkun } from '@prisma/client';

export class UpdatePassword {

  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
