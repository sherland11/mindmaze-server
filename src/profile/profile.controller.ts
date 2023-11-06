import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':username')
    async getUserByUsername(@Param('username') username: string) {
        const user = await this.usersService.findByUsername(username)
        return { username: user.username, avatar: user.avatar }
    }
}
