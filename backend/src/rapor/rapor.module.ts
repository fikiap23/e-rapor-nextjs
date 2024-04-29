import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { RaporService } from './rapor.service';
import { RaporRepository } from './rapor.repositoy';
import { RaporQuery } from '../prisma/queries/rapor/rapor.query';
import { RaporController } from './rapor.controller';
import { AuthModule } from '../auth/auth.module';
import { SekolahModule } from '../sekolah/sekolah.module';
import { MuridModule } from '../murid/murid.module';
import { SemesterModule } from '../semester/semester.module';
import { RombelModule } from '../rombel/rombel.module';
import { NilaiMingguanModule } from '../nilai-mingguan/nilai-mingguan.module';


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
        AuthModule,
        SekolahModule,
        MuridModule,
        SemesterModule,
        RombelModule,
        NilaiMingguanModule
    ],
    providers: [RaporService, RaporRepository, RaporQuery],
    controllers: [RaporController],
    exports: [RaporService, RaporRepository],
})
export class RaporModule { }