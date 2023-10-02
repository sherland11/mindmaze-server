import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Post extends Document {
    @Prop()
    title: string

    @Prop()
    content: string

    @Prop()
    date: Date
}

export const PostSchema = SchemaFactory.createForClass(Post)