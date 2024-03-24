import { IsString, IsDate, IsNotEmpty, IsEnum } from 'class-validator';
import { HariType } from '@prisma/client';
export class CreateJadwalAjarDto {
    @IsEnum(HariType)
    @IsNotEmpty()
    hari: HariType;

    @IsDate()
    @IsNotEmpty()
    tanggal: Date;

    @IsString()
    @IsNotEmpty()
    kegiatanInti: string;

    @IsString()
    @IsNotEmpty()
    idModulAjar: string;
}
