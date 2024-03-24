import { IsString, IsNotEmpty } from 'class-validator';

export class CreateKategoriRombelDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    kode: string;

    @IsString()
    @IsNotEmpty()
    kelompokUsia: string;
}


