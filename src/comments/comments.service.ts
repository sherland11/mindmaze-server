import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../models/comments.model';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>) {}
    
    async create(commentData: Comment): Promise<Comment> {
        const comment = new this.commentModel(commentData)
        return await comment.save()
    }

    async findAll(postId: string): Promise<Comment[]> {
        return this.commentModel.find({ postId }).exec()
    }

    async findByUsername(username: string): Promise<Comment[]> {
        return this.commentModel.find({ author: username }).exec()
    }
}
