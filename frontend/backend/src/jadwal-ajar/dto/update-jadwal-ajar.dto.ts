import { PartialType } from '@nestjs/mapped-types';
import { CreateJadwalAjarDto } from './create-jadwal-ajar.dto';


export class UpdateJadwalAjarDto extends PartialType(CreateJadwalAjarDto) { }