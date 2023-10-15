import { Controller, Param, Body, Post, Delete } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Post(':postId')
    async addLike(@Param('postId') postId: string, @Body('username') username: string) {
        return this.likeService.addLikeToPost(postId, username)
    }

    @Post('delete/:postId')
    async removeLike(@Param('postId') postId: string, @Body('username') username: string) {
        return this.likeService.removeLikeFromPost(postId, username);
    }
}
