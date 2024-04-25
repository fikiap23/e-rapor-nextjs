import { IsString, IsNotEmpty } from 'class-validator';

class GetMuridWithNilaiDto {
    @IsString()
    @IsNotEmpty()
    idMurid: string;

    @IsString()
    @IsNotEmpty()
    idRombelSemesterGuru: string;
}

export default GetMuridWithNilaiDto;
