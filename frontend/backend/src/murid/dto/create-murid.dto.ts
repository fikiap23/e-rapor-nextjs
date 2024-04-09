import { Agama, JenisKelamin, StatusAkun } from '@prisma/client';
import { IsString, IsOptional, IsEnum, IsInt, IsDate } from 'class-validator';


class CreateMuridDto {
    @IsString()
    @IsOptional()
    idRombel?: string;

    @IsString()
    nisn: string;

    @IsString()
    nis: string;

    @IsString()
    nama: string;

    @IsEnum(JenisKelamin)
    jenisKelamin: JenisKelamin;

    @IsOptional()
    @IsString()
    tempatLahir?: string;

    @IsOptional()
    @IsDate()
    tanggalLahir?: Date;

    @IsOptional()
    @IsEnum(Agama)
    agama?: Agama;

    @IsOptional()
    @IsString()
    alamat?: string;

    @IsOptional()
    @IsDate()
    tanggalMasuk?: Date;

    @IsOptional()
    @IsInt()
    tinggiBadan?: number;

    @IsOptional()
    @IsInt()
    beratBadan?: number;

    @IsOptional()
    @IsString()
    foto?: string;

    @IsOptional()
    @IsString()
    namaAyah?: string;

    @IsOptional()
    @IsString()
    namaIbu?: string;

    @IsOptional()
    @IsString()
    pekerjaanAyah?: string;

    @IsOptional()
    @IsString()
    pekerjaanIbu?: string;

    @IsEnum(StatusAkun)
    @IsOptional()
    status?: StatusAkun;
}

export default CreateMuridDto;
