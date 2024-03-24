import { SemesterType } from '@prisma/client';
import { IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateSemesterDto {

    @IsNotEmpty()
    @IsEnum(SemesterType)
    jenisSemester: SemesterType;

    @IsNotEmpty()
    @IsInt()
    tahunAjaranAwal: number;

    @IsNotEmpty()
    @IsInt()
    tahunAjaranAkhir: number;

    @IsOptional()
    @IsBoolean()
    isAktif: boolean;

    @IsNotEmpty()
    @IsDate()
    tglBagiRapor: Date;
}
