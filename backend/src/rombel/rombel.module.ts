import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { RombelService } from './rombel.service';
import { RombelRepository } from './rombel.repository';
import { RombelQuery } from '../prisma/queries/rombel/rombel.query';
import { RombelController } from './rombel.controller';
import { GuruRepository } from '../guru/guru.repository';
import { AuthRepository } from '../auth/auth.repository';
import { UserQuery } from '../prisma/queries/user/user.query';
import { GuruModule } from '../guru/guru.module';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
        GuruModule
    ],
    providers: [RombelService, RombelRepository, RombelQuery],
    controllers: [RombelController],
    exports: [RombelService, RombelRepository],
})
export class RombelModule { }