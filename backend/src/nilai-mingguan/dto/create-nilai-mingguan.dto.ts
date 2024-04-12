import { Nilai } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreatePenilaianMingguanDto {
    @IsEnum(Nilai)
    @IsNotEmpty()
    nilaiAgamaBudipekerti: Nilai;

    @IsString()
    @IsNotEmpty()
    deskripsiAgamaBudipekerti: string;

    @IsEnum(Nilai)
    @IsNotEmpty()
    nilaiJatiDiri: Nilai;

    @IsString()
    @IsNotEmpty()
    deskripsiJatiDiri: string;

    @IsEnum(Nilai)
    @IsNotEmpty()
    nilaiLiterasiSains: Nilai;

    @IsString()
    @IsNotEmpty()
    deskripsiLiterasiSains: string;

    @IsString()
    @IsNotEmpty()
    idModulAjar: string;

    @IsString()
    @IsNotEmpty()
    idMurid: string;
}
