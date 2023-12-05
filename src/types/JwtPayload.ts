import { IUser } from "src/schemas/User";
import { Types } from "mongoose";

export interface JwtPayload extends Omit<IUser, "password"> {
    id: Types.ObjectId;
}