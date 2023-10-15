import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/models/post.model';

@Injectable()
export class LikeService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async addLikeToPost(postId: string, username: string): Promise<Post> {
        const post = await this.postModel.findById(postId).exec()
        if (!post) throw new NotFoundException('Пост не найден')
        if (!post.likes.includes(username)) {
            post.likes.push(username)
            await post.save()
        }
        return post
    }

    async removeLikeFromPost(postId: string, username: string): Promise<Post> {
        const post = await this.postModel.findById(postId).exec();
        if (!post) {
          throw new NotFoundException('Пост не найден');
        }
        if (post.likes.includes(username)) {
          post.likes = post.likes.filter((id) => id !== username);
          await post.save();
        }
        return post;
    }
}
