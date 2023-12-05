import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "src/schemas/User";
import { createUser, findByEmail } from "../services/UserService";
import type { JwtPayload } from "src/types/JwtPayload";
import { TypedRequest, TypedResponse } from "src/utils/TypedController";

const jwtSign = (payload: JwtPayload, expiresIn: string) => {
    const secret = process.env.JWT_SECRET ?? "";

    const token = jwt.sign(payload, secret, {
        expiresIn
    })

    return token
}

export const register = async (req: TypedRequest<Record<string, never>, IUser>, res: TypedResponse<{ message: string }>) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("missing parameters");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    createUser({ username, email, password: hashPassword });

    return res.json({
        message: "successfully registered"
    });
}

export const login = async (req: TypedRequest<Record<string, never>, Omit<IUser, "username">>, res: TypedResponse<{ message: string }>) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("missing parameters");
    }

    const user = await findByEmail(email);
    if (!user) {
        return res.status(400).send("email not found");
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        return res.status(400).send("wrong password");
    }

    const accessTokenExpiresIn = process.env.ACCESS_TOKEN_JWT_EXPIRED ?? "";
    const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_JWT_EXPIRED ?? "";

    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    }

    const accessToken = jwtSign(payload, accessTokenExpiresIn);
    const refreshToken = jwtSign(payload, refreshTokenExpiresIn);

    return res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: true
    }).cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: true
    }).status(200).json({
        message: "logged in succesfully"
    })
}