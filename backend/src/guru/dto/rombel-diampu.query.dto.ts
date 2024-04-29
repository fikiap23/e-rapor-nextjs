import { IsEnum, IsOptional, } from 'class-validator';

export class RombelDiampuQueryDto {
    @IsEnum(['ALL', 'ACTIVE', 'INACTIVE'])
    @IsOptional()
    status?: 'ALL' | 'ACTIVE' | 'INACTIVE';
}