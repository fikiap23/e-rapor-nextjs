import { IsNotEmpty, IsString } from 'class-validator';

export class GetRaporByNisNamaDto {

    @IsString()
    @IsNotEmpty()
    nama: string;

    @IsString()
    @IsNotEmpty()
    nis: string;
}
