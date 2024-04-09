import { StatusAbsensi } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BulkAbsensiByJadwalDto {
    @IsEnum(StatusAbsensi)
    @IsNotEmpty()
    @IsString()
    status: StatusAbsensi;

    @IsOptional()
    @IsString()
    keterangan?: string;

    @IsNotEmpty()
    @IsString()
    idMurid: string;
}
