import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { AbsensiService } from './absensi.service';
import { AbsensiRepository } from './absensi.repository';
import { AbsensiQuery } from '../prisma/queries/absensi/absensi.query.dto';
import { AbsensiController } from './absensi.controller';
import { AuthModule } from '../auth/auth.module';
import { JadwalAjarRepository } from '../jadwal-ajar/jadwal-ajar.repository';
import { JadwalAjarModule } from '../jadwal-ajar/jadwal-ajar.module';
import { MuridModule } from '../murid/murid.module';


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
        AuthModule,
        JadwalAjarModule,
        MuridModule
    ],
    providers: [AbsensiService, AbsensiRepository, AbsensiQuery],
    controllers: [AbsensiController],
    exports: [AbsensiService, AbsensiRepository],
})
export class AbsensiModule { }