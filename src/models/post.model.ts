import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectId } from "mongodb";
import { Comment } from "./comments.model";

@Schema()
export class Post extends Document {
    @Prop()
    id: number

    @Prop()
    title: string

    @Prop()
    content: string

    @Prop()
    topic: string

    @Prop()
    date: Date

    @Prop()
    username: string

    @Prop({ type: [{ type: ObjectId, ref: 'Comment' }] })
    comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post)