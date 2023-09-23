import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { Comment, CommentSchema } from './models/comments.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://vancklies:n7ggQJXxbG2SMCJ8@angularpractice.ejm51gr.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    
  ],
  controllers: [AppController, CommentsController],
  providers: [AppService, CommentsService],
})
export class AppModule {}
