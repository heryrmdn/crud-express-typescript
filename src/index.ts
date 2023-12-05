import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import routes from "./routes";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT ?? "3000";

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(routes);

const MONGODB_URL = process.env.MONGODB_URL ?? "";
mongoose.connect(MONGODB_URL);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + Typescript Server");
})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})