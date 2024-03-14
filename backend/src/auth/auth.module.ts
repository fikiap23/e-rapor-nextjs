import { Module } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { HelperModule } from '../helpers/helper.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    MomentModule,
    ConfigModule,
    HelperModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
