import { Controller, Post, Body, Get, Param, Put, Delete, Query, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from 'src/models/post.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'multer.congig';
import { Response } from 'express';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image', multerConfig))
    async create(@Body() post: PostModel, @UploadedFile() file: Express.Multer.File): Promise<PostModel> {
        console.log(file)
        if (file) {
            post.image = file.path;
        }
        return this.postsService.create(post);
    }

    @Get()
    async getAllPosts(): Promise<PostModel[]> {
        return await this.postsService.getAllPosts()
    }
    
    @Get('search')
    async searchPosts(
        @Query('searchTerm') searchTerm: string,
        @Query('topic') topic: string,
        @Query('sortBy') sortBy: string,
    ): Promise<PostModel[]> {
        return this.postsService.searchPosts(searchTerm, topic, sortBy)
    }

    @Get(':id')
    async getPostById(@Param('id') id: string): Promise<PostModel | undefined> {
        return await this.postsService.getPostById(id)
    }

    @Get('title/:id')
    async getPostTitle(@Param('id') id: string): Promise<string> {
        return await this.postsService.getPostTitle(id)
    }

    @Get('images/uploads/:imagePath')
    async serveImage(@Param('imagePath') image: string, @Res() res: Response) {
        return res.sendFile(image, { root: 'uploads' })
    }

    @Get('username/:username')
    async getPostByUsername(@Param('username') username: string) {
        return await this.postsService
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image', multerConfig))
    async updatePost(@Param('id') postId: string, @Body() post: PostModel, @UploadedFile() file: Express.Multer.File): Promise<PostModel> {
        if (file) {
            post.image = file.path;
        }
        return this.postsService.updatePost(postId, post);
    }

    @Delete(':id')
    async deletePost(@Param('id') postId: string): Promise<void> {
        return this.postsService.deletePost(postId)
    }
}
