import { IsNotEmpty, IsString } from 'class-validator';

export class GetMuridByMingguDto {

    @IsString()
    @IsNotEmpty()
    idTujuanPembelajaran: string;

    @IsNotEmpty()
    @IsString()
    idRombelSemesterGuru: string;
}
