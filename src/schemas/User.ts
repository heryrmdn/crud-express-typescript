import { Schema, model, Document } from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface IUserDocument extends IUser, Document { }

const userSchema = new Schema<IUserDocument>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export const User = model<IUser>("User", userSchema);