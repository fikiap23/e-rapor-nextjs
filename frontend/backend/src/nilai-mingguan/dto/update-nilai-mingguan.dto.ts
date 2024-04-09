import { PartialType } from '@nestjs/mapped-types';
import { CreatePenilaianMingguanDto } from './create-nilai-mingguan.dto';

export class UpdatePenilaianMingguanDto extends PartialType(CreatePenilaianMingguanDto) { }