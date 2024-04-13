import { IsNotEmpty, IsString } from 'class-validator';

export class GetNilaiByMuridSemesterDto {

    @IsString()
    @IsNotEmpty()
    idMurid: string;

    @IsNotEmpty()
    @IsString()
    idRombelSemesterGuru: string;
}
