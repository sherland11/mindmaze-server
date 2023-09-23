import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Comment extends Document {
    @Prop({ required: true })
    postId: number

    @Prop({ required: true })
    author: string

    @Prop({ required: true })
    text: string

    @Prop({ default: Date.now })
    date: Date
}

export const CommentSchema = SchemaFactory.createForClass(Comment)