import { StatusAbsensi } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAbsensiDto {
    @IsEnum(StatusAbsensi)
    @IsString()
    status: StatusAbsensi;

    @IsOptional()
    @IsString()
    keterangan?: string;

    @IsNotEmpty()
    @IsString()
    idJadwalAjar: string;

    @IsNotEmpty()
    @IsString()
    idMurid: string;
}
