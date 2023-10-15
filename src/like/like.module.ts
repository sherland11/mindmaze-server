import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/models/post.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService]
})
export class LikeModule {}
