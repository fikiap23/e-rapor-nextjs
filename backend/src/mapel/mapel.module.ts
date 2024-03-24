import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { MapelService } from './mapel.service';
import { MapelRepository } from './mapel.repository';
import { MapelQuery } from '../prisma/queries/mapel/mapel.query';
import { MapelController } from './mapel.controller';


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
    ],
    providers: [MapelService, MapelRepository, MapelQuery],
    controllers: [MapelController],
    exports: [MapelService, MapelRepository],
})
export class MapelModule { }