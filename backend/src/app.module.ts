import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { GuruModule } from './guru/guru.module';
import { UserModule } from './user/user.module';
import { RombelModule } from './rombel/rombel.module';
import { MuridModule } from './murid/murid.module';
import { MapelModule } from './mapel/mapel.module';
import { ModulAjarModule } from './modul-ajar/modul-ajar.module';
import { JadwalAjarModule } from './jadwal-ajar/jadwal-ajar.module';
import { NilaiMingguanModule } from './nilai-mingguan/nilai-mingguan.module';
import { SemesterModule } from './semester/semester.module';
import { SekolahModule } from './sekolah/sekolah.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    GuruModule,
    UserModule,
    RombelModule,
    MuridModule,
    MapelModule,
    ModulAjarModule,
    JadwalAjarModule,
    NilaiMingguanModule,
    SemesterModule,
    SekolahModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
