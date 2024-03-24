import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';

@Injectable()
export class AbsensiQuery extends DbService {
}