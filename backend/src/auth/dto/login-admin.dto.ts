import { IsNotEmpty, IsString, IsOptional, ValidateIf } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.username === undefined)
  email?: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.email === undefined)
  username?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
