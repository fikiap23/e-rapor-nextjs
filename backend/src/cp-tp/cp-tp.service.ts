import { Injectable } from '@nestjs/common';
import { CpTpRepository } from './cp-tp.repository';

@Injectable()
export class CpTpService {
    constructor(private readonly cpTpRepository: CpTpRepository) { }

}