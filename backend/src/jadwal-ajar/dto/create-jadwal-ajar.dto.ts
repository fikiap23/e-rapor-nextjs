import { IsString, IsDate, IsNotEmpty, IsArray } from 'class-validator';
export class CreateJadwalAjarDto {

    @IsArray()
    kegiatanIntiHari1: string[];

    @IsArray()
    kegiatanIntiHari2: string[];

    @IsArray()
    kegiatanIntiHari3: string[];

    @IsArray()
    kegiatanIntiHari4: string[];

    @IsArray()
    kegiatanIntiHari5: string[];

    @IsArray()
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
    idModulAjar: string;
}
