import { Request, Response } from "express";
import { Query, Send } from "express-serve-static-core";

export interface TypedRequest<T extends Query, U> extends Request {
    query: T;
    body: U;
}

export interface TypedResponse<Resbody> extends Response {
    json: Send<Resbody, this>
}