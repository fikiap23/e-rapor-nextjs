import { StatusAkun } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GuruQueryDto {
    @IsString()
    @IsOptional()
    search?: string

    @IsEnum(StatusAkun)
    @IsOptional()
    status?: StatusAkun
}