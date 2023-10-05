import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from 'src/models/post.model';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    async create(@Body() post: PostModel): Promise<PostModel> {
        return this.postsService.create(post)
    }

    @Get()
    async getAllPosts(): Promise<PostModel[]> {
        return await this.postsService.getAllPosts()
    } 

    @Get(':id')
    async getPostById(@Param('id') id: number): Promise<PostModel | undefined> {
        return await this.postsService.getPostById(id)
    }

    @Put(':id')
    async updatePost(@Param('id') postId: string, @Body() postData: PostModel): Promise<PostModel> {
        return this.postsService.updatePost(postId, postData)
    }

    @Delete(':id')
    async deletePost(@Param('id') postId: string): Promise<void> {
        return this.postsService.deletePost(postId)
    }
}
