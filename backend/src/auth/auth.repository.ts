import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PayloadToken } from './type';
import { RoleEnum, TokenType } from '../helpers/helper';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserQuery } from '../prisma/queries/user/user.query';
import { use } from 'passport';
import { Role } from '@prisma/client';
@Injectable()
export class AuthRepository {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
        private readonly userQuery: UserQuery
    ) { }


    async findUserByUsernameOrEmailOrThrow(usernameOrEmail: string) {
        const user = await this.userQuery.findByEmailOrUsername(usernameOrEmail);
        if (!user) {
            throw new BadRequestException('User belum terdaftar');
        }
        return user;
    }

    async checkUserExist(username: string, email: string) {
        const user = await this.userQuery.findByEmailOrUsername(username);
        if (user) {
            throw new BadRequestException('User sudah terdaftar');
        }
        const userEmail = await this.userQuery.findByEmailOrUsername(email);
        if (userEmail) {
            throw new BadRequestException('Email sudah terdaftar');
        }
    }

    async findUserByIdOrThrow(id: string) {
        const user = await this.userQuery.findById(id);
        if (!user) {
            throw new BadRequestException('User tidak ditemukan');
        }
        return user;
    }
    /*
      |--------------------------------------------------------------------------
      | Auth user function
      |--------------------------------------------------------------------------
      */
    async login(dto: LoginUserDto) {
        try {
            const user = await this.findUserByUsernameOrEmailOrThrow(dto.username || dto.email);

            const validPassword = await bcrypt.compare(dto.password, user.password);

            if (!validPassword) {
                throw new BadRequestException('Password salah');
            }

            if (user.role === Role.GURU) {
                // find guru by user id
                const guru = await this.prisma.guru.findFirst({ where: { idUser: user.id }, include: { rombel: { select: { id: true } } } });
                const idsRombel = guru.rombel.map((rombel) => rombel.id);
                if (!guru) throw new BadRequestException('Akun Guru tidak ditemukan');

                // return token
                return await this.signJwtToken(
                    user.id,
                    user.role,
                    TokenType.FULL,
                    '7d',
                    idsRombel
                )
            }

            return await this.signJwtToken(
                user.id,
                user.role,
                TokenType.FULL,
                '7d',
            );
        } catch (error) {
            throw error;
        }
    }

    async updateForgotPassword(token: string, password: string) {
        const { sub } = await this.decodeJwtToken(token);
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const user = await this.userQuery.update(sub, { password: hash });
        if (!user) throw new BadRequestException('User gagal diubah');

        return user;
    }

    async registerGuru(dto: CreateUserDto) {
        return await this.register(dto, RoleEnum.GURU);
    }

    /*
      |--------------------------------------------------------------------------
      | Auth admin function
      |--------------------------------------------------------------------------
      */

    async adminRegister(dto: CreateUserDto) {
        return await this.register(dto, RoleEnum.ADMIN);
    }


    /*
      |--------------------------------------------------------------------------
      | Helper auth function
      |--------------------------------------------------------------------------
      */

    private async signJwtToken(
        idUser: string,
        role: string,
        access: string,
        expire: string,
        idsRombel?: any,
    ): Promise<{ access_token: string }> {
        //  payload user data for jwt token
        const payload: PayloadToken = {
            sub: idUser,
            role: role,
            access: access,
            expire: expire,
            idsRombel
        };

        // create token with data payload
        const token = await this.jwt.signAsync(payload, {
            expiresIn: expire,
            secret: this.config.get('JWT_SECRET'),
        });

        return { access_token: token };
    }

    async decodeJwtToken(accessToken: string) {
        const decodedJwt = this.jwt.decode(
            accessToken.split(' ')[1],
        ) as PayloadToken;
        return decodedJwt;
    }

    async refreshJwtToken(accessToken: string) {
        const decodedJwt = await this.decodeJwtToken(accessToken);
        // check valid token
        if (!decodedJwt) {
            throw new BadRequestException('Invalid token');
        }
        const user = await this.userQuery.findById(decodedJwt.sub);
        if (!user) throw new BadRequestException('Invalid token');

        return this.signJwtToken(
            decodedJwt.sub,
            decodedJwt.role,
            TokenType.FULL,
            '7d',
        );
    }

    async register(dto: CreateUserDto, role: RoleEnum) {
        // hashing password from body dto
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(dto.password, salt);
        try {
            dto.password = hash;
            dto.role = role
            // check user exist
            await this.checkUserExist(dto.username, dto.email);

            const createUser = await this.userQuery.create(dto)
            if (!createUser) throw new BadRequestException('User gagal ditambahkan');
            return await this.signJwtToken(
                createUser.id,
                RoleEnum.ADMIN,
                TokenType.FULL,
                '7d',
            );
        } catch (error) {
            throw error;
        }
    }

    async createUser(dto: CreateUserDto, role: RoleEnum) {
        // hashing password from body dto
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(dto.password, salt);
        try {
            dto.password = hash;
            dto.role = role
            // check user exist
            await this.checkUserExist(dto.username, dto.email);

            const createUser = await this.userQuery.create(dto)
            if (!createUser) throw new BadRequestException('User gagal ditambahkan');
            return createUser
        } catch (error) {
            throw error;
        }
    }
}
