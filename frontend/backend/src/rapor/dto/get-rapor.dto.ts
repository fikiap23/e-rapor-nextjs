import { IsNotEmpty, IsString } from 'class-validator';

export class GetRaporDto {
    @IsString()
    @IsNotEmpty()
    idSemester: string;

    @IsString()
    @IsNotEmpty()
    idMurid: string;
}
