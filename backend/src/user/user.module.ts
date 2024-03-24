import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserQuery } from '../prisma/queries/user/user.query';
import { UserController } from './user.controller';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
    ],
    providers: [UserService, UserRepository, UserQuery],
    controllers: [UserController],
    exports: [UserService, UserRepository],
})
export class UserModule { }