import express from "express";
import bodyParser from "body-parser";
import swaggerUI from "@creativearis/swagger";
import api from "./api";

const app = express();

app.use(
    express.json(),
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(
    swaggerUI(
        process.env.HOST || "http://localhost:5002",
        process.env.NODE_ENV !== "production" ? "dist" : ""
    )
);

app.use(api);

export default app;
