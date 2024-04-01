import { IsString, IsNotEmpty, } from 'class-validator';

export class CreateCPDto {
    @IsString()
    @IsNotEmpty()
    capaianPembelajaranAgama: string;

    @IsString()
    @IsNotEmpty()
    capaianPembelajaranJatiDiri: string;


    @IsString()
    @IsNotEmpty()
    capaianPembelajaranLiterasiSains: string;
}
