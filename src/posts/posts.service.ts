import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { unlink } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { Post } from 'src/models/post.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}

    async create(post: Post): Promise<Post> {
        const createdPost = new this.postModel(post)
        return createdPost.save()
    }

    async getAllPosts(): Promise<Post[]> {
        return await this.postModel.find().exec()
    }

    async searchPosts(searchTerm: string, topic: string, sortBy: string): Promise<Post[]> {
        const regex = new RegExp(searchTerm, 'i')
        const filter: any = { $or: [{ title: regex }, { content: regex }] }
        
        if (topic) filter.topic = topic

        let aggregationPipeline: any[] = [
            { $match: filter }
          ];
        
        let posts = this.postModel.find(filter)

        switch (sortBy) {
            case 'popular':
                aggregationPipeline.push({
                    $addFields: {
                      likesCount: { $size: '$likes' }
                    }
                  });
            
                  aggregationPipeline.push({
                    $sort: { likesCount: -1 }
                  });
                break
            case 'new':
                aggregationPipeline.push({
                    $sort: { date: -1 }
                });
        }

        return this.postModel.aggregate(aggregationPipeline).exec()

    }

    async getPostById(id: string): Promise<Post | undefined> {
        try {
            return await this.postModel.findById(id).exec()
        } catch (error) {
            throw new NotFoundException('Пост не найден')
        }
    }

    async getPostByUsername(username: string): Promise<Post[]> {
        return await this.postModel.find({ username: username })
    }

    async getPostTitle(postId: string): Promise<string> {
        return (await this.postModel.findById(postId)).title
    }

    async updatePost(postId: string, postData: Post): Promise<Post> {
        const updatedPost = await this.postModel.findByIdAndUpdate(postId, postData, { new: true }).exec()
        if (!updatedPost) {
            console.log('Post not found')
        }

        return updatedPost
    }

    async deletePost(postId: string): Promise<Post> {
        const post = await this.postModel.findById(postId).exec()
        if (post) {
            const rootPath = process.cwd()
            const absolutePath = join(rootPath, post.image)
            unlink(absolutePath, (error) => {
                console.error(error)
            })
            return await this.postModel.findByIdAndDelete(postId).exec() 
        } else {
            console.log('Пост не найден')
        }
    }
}
