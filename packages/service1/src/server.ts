import express from "express";
import bodyParser from "body-parser";
import swaggerUI from "@creativearis/swagger"; // fails
import api from "./api";
import db from "./services/db";

const app = express();

function handleDatabaseUrl() {
    const url = process.env.DB_URL;
    if (!url) {
        return "mongodb://localhost/mussia8";
    }

    return url.includes("cluster")
        ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${url}`
        : url;
}

const databaseUrl = handleDatabaseUrl();
console.log("databaseUrl", databaseUrl); // eslint-disable-line

app.use(swaggerUI(process.env.HOST || "http://localhost:5000"));
// app.use(swaggerUI("ad"));
app.use(db(databaseUrl));
app.use(
    express.json(),
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(api);

export default app;
