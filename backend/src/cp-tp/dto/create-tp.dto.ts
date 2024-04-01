import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTPDto {

    @IsInt()
    @IsNotEmpty()
    minggu: number;

    @IsString()
    @IsNotEmpty()
    tujuanPembelajaranJatiDiri: string;


    @IsString()
    @IsNotEmpty()
    tujuanPembelajaranLiterasiSains: string;

    @IsString()
    @IsNotEmpty()
    tujuanPembelajaranAgamaBudipekerti: string;


}
