import { JenisKelamin } from '@prisma/client';
import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';


class CreateGuruDto {

    @IsString()
    @IsNotEmpty()
    nip: string;

    @IsString()
    @IsNotEmpty()
    nama: string;

    @IsEnum(JenisKelamin)
    @IsNotEmpty()
    jenisKelamin: JenisKelamin;

    @IsString()
    @IsOptional()
    idUser?: string;
}

export default CreateGuruDto;
