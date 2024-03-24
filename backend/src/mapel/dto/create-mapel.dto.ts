import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

class CreateMapelDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    deskripsi: string;

    @IsOptional()
    @IsBoolean()
    isAktif: boolean;
}

export default CreateMapelDto;
