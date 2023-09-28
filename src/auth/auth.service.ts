import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async register({ username, password }): Promise<any> {
        try {
            const existingUser = await this.userService.findByUsername(username);
            if (existingUser) {
                return { success: false, message: 'Пользователь с таким именем уже существует' };
            }
    
            const user = await this.userService.createUser(username, password);
            return { success: true, message: 'Пользователь успешно зарегистрирован', user };
        } catch (error) {
            return { success: false, message: 'Ошибка при регистрации' };
        }
    }

    async login(user: User): Promise<any> {
        try {
            const payload = { username: user.username, sub: user._id };
            const access_token = this.jwtService.sign(payload);
            return {
                success: true,
                message: 'Вход выполнен успешно',
                access_token,
            };
        } catch (error) {
            return {
                success: false,
                message: 'Ошибка при входе',
                error: error.message, // Можете добавить дополнительные детали ошибки, если необходимо
            };
        }
    }
}
