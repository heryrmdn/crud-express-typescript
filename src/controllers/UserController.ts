import { Request, Response } from "express";

type User = {
    name: string,
    email: string
};

export const getUsers = (req: Request, res: Response) => {
    const users: Array<User> = [
        {
            name: "Hery",
            email: "hery@mail.com"
        },
        {
            name: "Budi",
            email: "budi@mail.com"
        }
    ];

    return res.json(users);
};