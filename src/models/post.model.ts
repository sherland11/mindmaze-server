import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectId } from "mongodb";
import { Comment } from "./comments.model";

@Schema()
export class Post extends Document {

    @Prop()
    title: string

    @Prop()
    content: string

    @Prop()
    topic: string

    @Prop()
    date: number

    @Prop()
    username: string

    @Prop()
    likes: string[]

    @Prop()
    image: string

    @Prop({ type: [{ type: ObjectId, ref: 'Comment' }] })
    comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post)