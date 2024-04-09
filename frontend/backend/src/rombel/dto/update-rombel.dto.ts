import { PartialType } from '@nestjs/mapped-types';
import { CreateRombelDto } from './create-rombel.dto';



export class UpdateRombelDto extends PartialType(CreateRombelDto) { }