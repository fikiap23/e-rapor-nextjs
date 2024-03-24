import { IsInt, IsString, IsArray, IsNotEmpty, IsDate } from 'class-validator';

class CreateModulAjarDto {
    @IsNotEmpty()
    @IsInt()
    minggu: number;

    @IsNotEmpty()
    @IsString()
    topik: string;

    @IsNotEmpty()
    @IsString()
    subtopik: string;

    @IsNotEmpty()
    @IsString()
    capaianPembelajaran: string;

    @IsNotEmpty()
    @IsDate()
    startDate: Date;

    @IsNotEmpty()
    @IsDate()
    endDate: Date;

    @IsNotEmpty()
    @IsArray()
    katakunci: string[];

    @IsNotEmpty()
    @IsArray()
    tujuanPembelajaran: string[];

    @IsNotEmpty()
    @IsArray()
    tujuanKegiatan: string[];

    @IsNotEmpty()
    @IsArray()
    alatBahan: string[];

    @IsNotEmpty()
    @IsArray()
    petaKonsep: string[];

    @IsNotEmpty()
    @IsString()
    idMapel: string;
}

export default CreateModulAjarDto;
