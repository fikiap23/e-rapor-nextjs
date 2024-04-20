import { IsString, IsDate, IsNotEmpty, IsArray } from 'class-validator';
export class CreateJadwalAjarDto {

    @IsArray()
    @IsNotEmpty()
    kegiatanIntiHari1: string[];

    @IsArray()
    @IsNotEmpty()
    kegiatanIntiHari2: string[];

    @IsArray()
    @IsNotEmpty()
    kegiatanIntiHari3: string[];

    @IsArray()
    @IsNotEmpty()
    kegiatanIntiHari4: string[];

    @IsArray()
    @IsNotEmpty()
    kegiatanIntiHari5: string[];

    @IsArray()
    @IsNotEmpty()
    kegiatanIntiHari6: string[];

    @IsDate()
    tanggalHari1: Date;

    @IsDate()
    tanggalHari2: Date;

    @IsDate()
    tanggalHari3: Date;

    @IsDate()
    tanggalHari4: Date;

    @IsDate()
    tanggalHari5: Date;

    @IsDate()
    tanggalHari6: Date;

    @IsString()
    @IsNotEmpty()
    idModulAjar: string;
}
