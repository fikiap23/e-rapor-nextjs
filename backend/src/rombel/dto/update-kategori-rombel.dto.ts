import { PartialType } from '@nestjs/mapped-types';
import { CreateKategoriRombelDto } from './create-kategori-rombel.dto';


export class UpdatKategoriRombelDto extends PartialType(CreateKategoriRombelDto) { }