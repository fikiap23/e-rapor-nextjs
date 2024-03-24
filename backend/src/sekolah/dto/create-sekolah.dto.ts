import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSekolahDto {
    @IsNotEmpty()
    @IsString()
    npsn: string;

    @IsNotEmpty()
    @IsString()
    nama: string;

    @IsNotEmpty()
    @IsString()
    alamat: string;

    @IsNotEmpty()
    @IsString()
    kodePos: string;

    @IsNotEmpty()
    @IsString()
    noTelepon: string;

    @IsNotEmpty()
    @IsString()
    provinsi: string;

    @IsNotEmpty()
    @IsString()
    kota: string;

    @IsNotEmpty()
    @IsString()
    kecamatan: string;

    @IsNotEmpty()
    @IsString()
    kelurahan: string;

    @IsNotEmpty()
    @IsString()
    namaDisdik: string;

    @IsNotEmpty()
    @IsString()
    namaKapsek: string;

    @IsNotEmpty()
    @IsString()
    nipKepsek: string;
}
