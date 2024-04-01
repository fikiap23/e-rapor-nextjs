import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { CpTpRepository } from './cp-tp.repository';
import { CpTpService } from './cp-tp.service';
import { CpTpController } from './cp-tp.controller';



@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
    ],
    providers: [CpTpService, CpTpRepository],
    controllers: [CpTpController],
    exports: [CpTpService, CpTpRepository],
})
export class CpTpModule { }