import { IsString, IsInt, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateRombelDto {
    @IsString()
    @IsOptional()
    idGuru?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    kuota: number;

    @IsNotEmpty()
    idKategoriRombel: string
}


