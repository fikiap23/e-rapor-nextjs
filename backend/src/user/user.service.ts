import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from '../auth/dto/update-user.dto';


@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async updateUser(id: string, dto: UpdateUserDto) {
        return await this.userRepository.update(id, dto)
    }

    async findMe(token: string) {
        return await this.userRepository.findMe(token)
    }
}