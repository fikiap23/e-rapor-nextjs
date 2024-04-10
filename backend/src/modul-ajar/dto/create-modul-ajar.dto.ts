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
    @IsDate()
    startDate: Date;

    @IsNotEmpty()
    @IsDate()
    endDate: Date;

    @IsNotEmpty()
    @IsArray()
    katakunci: string[];

    @IsNotEmpty()
    @IsString()
    tujuanKegiatan: string;

    @IsNotEmpty()
    @IsArray()
    alatBahan: string[];

    @IsNotEmpty()
    @IsArray()
    petaKonsep: string[];

    @IsNotEmpty()
    @IsString()
    idTujuanPembelajaran: string;

    @IsNotEmpty()
    @IsString()
    idRombelSemesterGuru: string;
}

export default CreateModulAjarDto;
