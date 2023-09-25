import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async register({ username, password }): Promise<User> {
        const existingUser = await this.userService.findByUsername(username)
        if (existingUser) {
            throw new Error('Пользователя с таким именем уже существует')
        }

        const user = await this.userService.createUser(username, password)
        return user
    }

    async login(user: User): Promise<any> {
        const payload = { username: user.username, sub: user._id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
