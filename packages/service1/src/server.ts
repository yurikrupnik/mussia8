import express, { Router } from "express";
import os from "os";
import path from "path";
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
        return "mongodb://localhost/mussia7";
        // return "mongodb://db/mussia4";
    }

    // const isMlab = url.includes("mlab");

    return url.includes("cluster")
        ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${url}`
        : url;
}

const databaseUrl = handleDatabaseUrl();
console.log("databaseUrl", databaseUrl); // eslint-disable-line

function swaggerUI(url: string) {
    // todo module
    console.log("os.hostname()", os.hostname()); // eslint-disable-line
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
// app.use((req, res, next) => {
//     console.log("req.url", req.url);
//     console.log("req.hostname", req.hostname);
//     // app.use(swaggerUI("http://localhost:5001"));
//     next();
//     // next(swaggerUI(req.hostname));
// });
app.use(swaggerUI("http://localhost:5000"));
app.use(db(databaseUrl));
app.use(api);

export default app;
