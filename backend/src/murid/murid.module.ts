import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { MuridController } from './murid.controller';
import { MuridService } from './murid.service';
import { MuridRepository } from './murid.repository';
import { MuridQuery } from '../prisma/queries/murid/murid.query';
import { RombelModule } from '../rombel/rombel.module';


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
        RombelModule
    ],
    providers: [MuridService, MuridRepository, MuridQuery],
    controllers: [MuridController],
    exports: [MuridService, MuridRepository],
})
export class MuridModule { }