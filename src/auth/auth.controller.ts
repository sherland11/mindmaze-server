import { Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'multer.congig';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @UseInterceptors(FileInterceptor('avatar', multerConfig))
    async register(@UploadedFile() avatar: Express.Multer.File, @Request() req) {
        console.log(avatar.path)
        console.log(req.body)
        return await this.authService.register(req.body, avatar.path)
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }
}
