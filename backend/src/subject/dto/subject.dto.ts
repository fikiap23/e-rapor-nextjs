import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  shortName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  code: string;
}

export class UpdateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  shortName?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  code?: string;
}
