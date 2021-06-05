import express, { Router } from "express";
import os from "os";
import path from "path";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import api from "./api";
import db from "./services/db";

const app = express();

function handleDatabaseUrl() {
    // console.log("process.env.DATABASE_URL", process.env.DB_URL);
    // console.log("process.env.DATABASE_PASSWORD", process.env.DB_PASSWORD);
    // console.log("process.env.DB_USER", process.env.DB_USER);
    const url = process.env.DB_URL;
    if (!url) {
        return "mongodb://localhost/mussia8";
        // return "mongodb://db/mussia4";
    }

    // const isMlab = url.includes("mlab");

    return url.includes("cluster")
        ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${url}`
        : url;
}

const databaseUrl = handleDatabaseUrl();
console.log("databaseUrl", databaseUrl); // eslint-disable-line

let host = "http://localhost:5000";

function swaggerUI(url: string) {
    // todo module
    const r = Router();
    r.get("/swagger", (req, res) => {
        res.header("Content-Type", "application/json");
        res.sendFile(path.join(__dirname, "swagger.json"));
    });
    r.use("/doc", swaggerUi.serve);
    r.get(
        "/doc",
        swaggerUi.setup(
            {},
            {
                swaggerOptions: {
                    url: `${url}/swagger`
                }
            }
        )
    );
    return r;
}

// app.use(swaggerUI(`${host}:${port}`));
app.use((req, res, next) => {
    // console.log("req.url", req.url);
    host = req.hostname;
    console.log("req.hostname", req.hostname); // eslint-disable-line
    console.log("os.hostname()", os.hostname()); // eslint-disable-line
    console.log("os.platform()", os.platform()); // eslint-disable-line
    // app.use(swaggerUI("http://localhost:5001"));
    next();
    // next(swaggerUI(req.hostname));
});
app.use(swaggerUI(host || process.env.HOST || "http://localhost:5000"));
app.use(db(databaseUrl));
app.use(
    express.json(),
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(api);

export default app;
