import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { Comment, CommentSchema } from './models/comments.model';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://vancklies:n7ggQJXxbG2SMCJ8@angularpractice.ejm51gr.mongodb.net/?retryWrites=true&w=majority'),
    UsersModule,
    CommentsModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
