import { Controller, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from 'src/models/post.model';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    async create(@Body() post: PostModel): Promise<PostModel> {
        return this.postsService.create(post)
    }
}
