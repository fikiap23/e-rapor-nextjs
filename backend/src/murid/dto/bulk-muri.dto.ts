import { Agama, JenisKelamin, StatusAkun } from '@prisma/client';
import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';


class BulkMuridDto {
    @IsString()
    @IsOptional()
    idRombel?: string;

    @IsString()
    nisn: string;

    @IsString()
    nis: string;

    @IsString()
    nama: string;

    @IsInt()
    @IsOptional()
    anakKe: number;

    @IsEnum(JenisKelamin)
    jenisKelamin: JenisKelamin;

    @IsOptional()
    @IsString()
    tempatLahir?: string;

    @IsOptional()
    tanggalLahir?: any;

    @IsOptional()
    @IsEnum(Agama)
    agama?: Agama;

    @IsOptional()
    @IsString()
    alamat?: string;

    @IsOptional()
    tanggalMasuk?: any

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

    @IsOptional()
    @IsString()
    jalan?: string

    @IsOptional()
    @IsString()
    kelurahan?: string

    @IsOptional()
    @IsString()
    kecamatan?: string

    @IsOptional()
    @IsString()
    kota?: string

    @IsOptional()
    @IsString()
    provinsi?: string

    @IsEnum(StatusAkun)
    @IsOptional()
    status?: StatusAkun;
}

export default BulkMuridDto;
