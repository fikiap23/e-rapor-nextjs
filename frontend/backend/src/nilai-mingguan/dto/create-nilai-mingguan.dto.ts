import { Nilai } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePenilaianMingguanDto {
    @IsEnum(Nilai)
    @IsNotEmpty()
    nilai: Nilai;

    @IsString()
    @IsNotEmpty()
    deskripsi: string;

    @IsString()
    @IsNotEmpty()
    idModulAjar: string;

    @IsString()
    @IsNotEmpty()
    idMurid: string;
}
