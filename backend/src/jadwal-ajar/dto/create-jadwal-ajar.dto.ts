import { IsString, IsDate, IsArray, IsOptional, IsNotEmpty, } from 'class-validator';
export class CreateJadwalAjarDto {

    @IsOptional()
    @IsArray()
    kegiatanIntiHari1: string[];

    @IsOptional()
    @IsArray()
    kegiatanIntiHari2: string[];

    @IsOptional()
    @IsArray()
    kegiatanIntiHari3: string[];

    @IsOptional()
    @IsArray()
    kegiatanIntiHari4: string[];

    @IsOptional()
    @IsArray()
    kegiatanIntiHari5: string[];

    @IsOptional()
    @IsArray()
    kegiatanIntiHari6: string[];

    @IsOptional()
    @IsDate()
    tanggalHari1: Date;

    @IsOptional()
    @IsDate()
    tanggalHari2: Date;

    @IsOptional()
    @IsDate()
    tanggalHari3: Date;

    @IsOptional()
    @IsDate()
    tanggalHari4: Date;

    @IsOptional()
    @IsDate()
    tanggalHari5: Date;

    @IsOptional()
    @IsDate()
    tanggalHari6: Date;

    @IsNotEmpty()
    @IsString()
    idModulAjar: string;
}
