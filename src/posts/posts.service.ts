import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/models/post.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}

    async create(post: Post): Promise<Post> {
        const createdPost = new this.postModel(post)
        return createdPost.save()
    }
}
