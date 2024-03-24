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


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
    ],
    providers: [AbsensiService, AbsensiRepository, AbsensiQuery],
    controllers: [AbsensiController],
    exports: [AbsensiService, AbsensiRepository],
})
export class AbsensiModule { }