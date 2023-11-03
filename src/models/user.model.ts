import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop()
    username: string

    @Prop()
    password: string

    @Prop()
    avatar: string
}

export const UserSchema = SchemaFactory.createForClass(User)