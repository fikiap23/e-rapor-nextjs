import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateRombelSemesterGuruDto {
    @IsString()
    @IsNotEmpty()
    idGuru: string;

    @IsString()
    @IsNotEmpty()
    idSemester: string;

    @IsString()
    @IsNotEmpty()
    idRombel: string;
}


