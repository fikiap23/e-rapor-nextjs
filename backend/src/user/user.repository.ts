import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserQuery } from '../prisma/queries/user/user.query';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { AuthRepository } from '../auth/auth.repository';


@Injectable()
export class UserRepository {
    constructor(private readonly userQuery: UserQuery, private readonly authRepository: AuthRepository) { }

    async findByIdOrThrow(id: string) {
        const user = await this.userQuery.findById(id)
        if (!user) {
            throw new BadRequestException('User not found')
        }
        return user
    }

    async update(id: string, dto: UpdateUserDto) {
        await this.findByIdOrThrow(id)
        return await this.userQuery.update(id, dto)
    }

    async findMe(token: string) {
        const { sub } = await this.authRepository.decodeJwtToken(token)
        return await this.userQuery.findMe(sub)
    }

    async getDashboardAdmin() {
        return await this.userQuery.getDashboardAdmin()
    }
}