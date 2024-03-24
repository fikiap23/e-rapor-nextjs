import { Injectable } from '@nestjs/common';
import { UserQuery } from '../prisma/queries/user/user.query';


@Injectable()
export class UserRepository {
    constructor(private readonly userQuery: UserQuery) { }
}