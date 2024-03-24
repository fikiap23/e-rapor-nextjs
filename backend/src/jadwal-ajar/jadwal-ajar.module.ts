import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { JadwalAjarService } from './jadwal-ajar.service';
import { JadwalAjarRepository } from './jadwal-ajar.repository';
import { JadwalAjarQuery } from '../prisma/queries/jadwal-ajar/jadwal-ajar.query';
import { JadwalAjarController } from './jadwal-ajar.controller';
import { ModulAjarModule } from '../modul-ajar/modul-ajar.module';
import { AuthModule } from '../auth/auth.module';


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
        AuthModule,
        ModulAjarModule
    ],
    providers: [JadwalAjarService, JadwalAjarRepository, JadwalAjarQuery],
    controllers: [JadwalAjarController],
    exports: [JadwalAjarService, JadwalAjarRepository],
})
export class JadwalAjarModule { }