import { IsString, IsNotEmpty } from 'class-validator';

export class CreateKategoriRombelDto {
    @IsString()
    @IsNotEmpty()
    kode: string;

    @IsString()
    @IsNotEmpty()
    kelompokUsia: string;
}


