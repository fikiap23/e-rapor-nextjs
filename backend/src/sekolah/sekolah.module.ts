import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { SekolahController } from './sekolah.controller';
import { SekolahService } from './sekolah.service';
import { SekolahRepository } from './sekolah.repository';
import { SekolahQuery } from '../prisma/queries/sekolah/sekolah.query';


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
    ],
    providers: [SekolahService, SekolahRepository, SekolahQuery],
    controllers: [SekolahController],
    exports: [SekolahService, SekolahRepository],
})
export class SekolahModule { }