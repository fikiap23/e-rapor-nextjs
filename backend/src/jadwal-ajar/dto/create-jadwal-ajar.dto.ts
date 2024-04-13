import { IsString, IsDate, IsNotEmpty, IsArray } from 'class-validator';
export class CreateJadwalAjarDto {

    @IsDate()
    @IsNotEmpty()
    tanggal: Date;

    @IsArray()
    @IsNotEmpty()
    kegiatanInti: string[];

    @IsString()
    @IsNotEmpty()
    idModulAjar: string;
}
