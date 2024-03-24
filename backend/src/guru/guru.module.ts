import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { GuruController } from './guru.controller';
import { GuruService } from './guru.service';
import { GuruRepository } from './guru.repository';
import { GuruQuery } from '../prisma/queries/guru/guru.query';
import { AuthRepository } from '../auth/auth.repository';


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
    ],
    providers: [GuruService, GuruRepository, GuruQuery, AuthRepository],
    controllers: [GuruController],
    exports: [GuruService, GuruRepository],
})
export class GuruModule { }