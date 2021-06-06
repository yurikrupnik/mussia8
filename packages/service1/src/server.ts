import express, { Router } from "express";
import path from "path";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
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

function swaggerUI(url: string) {
    // todo module
    const r = Router();
    r.get("/swagger.json", (req, res) => {
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
                    url: `${url}/swagger.json`
                }
            }
        )
    );
    return r;
}

app.use(swaggerUI(process.env.HOST || "http://localhost:5000"));
app.use(db(databaseUrl));
app.use(
    express.json(),
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(api);

export default app;
