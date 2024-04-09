import { BadRequestException, Injectable } from '@nestjs/common';
import { UserQuery } from '../prisma/queries/user/user.query';
import { UpdateUserDto } from '../auth/dto/update-user.dto';


@Injectable()
export class UserRepository {
    constructor(private readonly userQuery: UserQuery) { }

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
}