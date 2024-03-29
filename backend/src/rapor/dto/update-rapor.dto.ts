import { PartialType } from '@nestjs/mapped-types';
import { CreateRaporDto } from './create-rapor.dto';

export class UpdateRaporDto extends PartialType(CreateRaporDto) { }