import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { ModulAjarService } from './modul-ajar.service';
import { ModulAjarRepository } from './modul-ajar.repository';
import { ModulAjarQuery } from '../prisma/queries/modul-ajar/modul-ajar.query';
import { AuthModule } from '../auth/auth.module';
import { ModulAjarController } from './modul-ajar.comtroller';
import { MapelModule } from '../mapel/mapel.module';


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
        AuthModule,
        MapelModule
    ],
    providers: [ModulAjarService, ModulAjarRepository, ModulAjarQuery],
    controllers: [ModulAjarController],
    exports: [ModulAjarService, ModulAjarRepository],
})
export class ModulAjarModule { }