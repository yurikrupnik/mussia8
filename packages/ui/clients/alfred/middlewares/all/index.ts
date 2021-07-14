import nc from "next-connect";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDb from "../db";

const handler = nc()
    .use(morgan("dev"))
    .use(helmet())
    .use(cookieParser())
    .use(connectDb);

export default handler;
