import { PartialType } from '@nestjs/mapped-types';
import CreateModulAjarDto from './create-modul-ajar.dto';

export class UpdateModulAjarDto extends PartialType(CreateModulAjarDto) { }