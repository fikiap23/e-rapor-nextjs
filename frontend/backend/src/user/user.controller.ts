import {
    Body,
    Controller,
    Get,
    Put,
    HttpStatus,
    Param,
    Post,
    Res,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { HttpHelper } from '../helpers/http-helper';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly httpHelper: HttpHelper) { }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @Put(':id')
    async update(@Body() dto: UpdateUserDto, @Res() res, @Param('id') id) {
        const result = await this.userService.updateUser(id, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {})
    }
}