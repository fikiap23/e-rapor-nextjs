import { IsNotEmpty, IsString } from 'class-validator';

export class GetRaporByIdRombelSemesterDto {
    @IsString()
    @IsNotEmpty()
    idSemester: string;

    @IsString()
    @IsNotEmpty()
    idRombel: string;
}
