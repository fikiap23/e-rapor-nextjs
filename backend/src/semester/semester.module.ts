import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { SemesterService } from './semester.service';
import { SemesterRepository } from './semester.repository';
import { SemesterQuery } from '../prisma/queries/semester/semester.query.dto';
import { SemesterController } from './semester.controller';



@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
    ],
    providers: [SemesterService, SemesterRepository, SemesterQuery],
    controllers: [SemesterController],
    exports: [SemesterService, SemesterRepository],
})
export class SemesterModule { }