import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from 'src/models/comments.model';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {}

    @Post()
    async create(@Body() createCommentDto: Comment): Promise<Comment> {
        return this.commentService.create(createCommentDto);
    }

    @Get(':postId')
    async findAll(@Param('postId') postId: string): Promise<Comment[]> {
        return this.commentService.findAll(postId)
    }
}
