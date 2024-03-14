import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // check token for student
    const user = await this.prisma.student.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if (user) return true;
    // check token for teacher
    if (!user) {
      const userTeacher = await this.prisma.teacher.findUnique({
        where: {
          id: payload.sub,
        },
      });
      if (userTeacher) return true;
    }

    // check token for super admin user
    if (!user) {
      const userAdmin = await this.prisma.admin.findUnique({
        where: {
          id: payload.sub,
        },
      });
      if (userAdmin) return true;
    }

    // return true if data not exist
    return false;
  }
}
