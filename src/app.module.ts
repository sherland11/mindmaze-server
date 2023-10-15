import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PostsModule } from './posts/posts.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://vancklies:n7ggQJXxbG2SMCJ8@angularpractice.ejm51gr.mongodb.net/?retryWrites=true&w=majority'),
    UsersModule,
    CommentsModule,
    AuthModule,
    ProfileModule,
    PostsModule,
    LikeModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
