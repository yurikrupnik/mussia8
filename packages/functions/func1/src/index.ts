import express, { Request, Response, Router } from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import path from "path";
import os from "os";
import { event } from "@creativearis/models";
import { nequeue } from "./gcp-tasks"; //createHttpTask,

const app = express();

const records = [
    {
        name: "A"
    },
    {
        name: "B"
    }
];

const Model = event(mongoose);

async function dbConnect() {
    return mongoose.connect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        "mongodb+srv://yurikrupnik:T4eXKj1RBI4VnszC@cluster0.rdmew.mongodb.net/",
        // process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        // (err) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log("DB Successfully connected");
        //     }
        // }
    );
}

const api = () => {
    const route = Router();
    route.get("/fun2", async (req, res) => {
        records.forEach(nequeue);
        // await createHttpTask("my message here from yri", 20);
        // records.forEach(createHttpTask);
        // for (const record of records) {
        //     nequeue(record);
        // }

        res.status(200).json({
            data: "all goossd"
        });
    });
    route.get("/dam", async (req, res) => {
        // await createHttpTask("nane");
        dbConnect().then(() => {
            // console.log("something", something);
            const ds = new Model({
                tenantId: "1234567",
                intField: 12356,
                stringField: "ariss here"
            });
            ds.save().then((aa) => {
                console.log("aa", aa);
                res.status(200).json({
                    data: "all dam"
                });
            });
        });
    });
    return route;
};

app.use(api());

console.log("os.hostname()", os.hostname()); // eslint-disable-line
app.use(swaggerUI(os.hostname())); // todo make generic

function swaggerUI(url: string) {
    // todo module
    const r = Router();
    /**
     * @swagger
     * /swagger:
     *   get:
     *     tags:
     *       - Swagger
     *     name: Swagger file
     *     summary: Get swagger json
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Send swagger.json file
     */
    r.get("/swagger", (req, res) => {
        res.header("Content-Type", "application/json");
        res.sendFile(path.join(__dirname, "swagger.json"));
        // res.json({
        //     aris: "tr"
        // });
    });
    r.use("/doc", swaggerUi.serve);
    /**
     * @swagger
     * /doc:
     *   get:
     *     tags:
     *       - Swagger
     *     name: Swagger
     *     summary: Swagger ui
     *     consumes:
     *       - application/json
     *     produces:
     *       - text/html
     *     responses:
     *       200:
     *         description: swagger ui
     */
    r.get(
        "/doc",
        // swaggerUi.setup(openapiSpecification)
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
// import button from '@krupnik/button';
// import axios from 'axios';
// import chalk from 'chalk';
// import mongoose from 'mongoose';
// import render from '@krupnik/render/dist/cjs/index';
// import morgan from 'morgan/index';

const func1 = app;

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Func3
 *     name: Func3
 *     summary: Find nothing
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single project object
 *       401:
 *         description: No auth token
 */
const func3 = (req: Request, res: Response) => {
    res.status(200).json({
        ok: "yes funk 3"
    });
};
// const swagger = (req: Request, res: Response) => {
//     res.status(200).json({
//         ok: "yes funk 3"
//     });
// };
// exports.func1 = func1;
export { func3, func1 };

// function(req, res) => {
//     function: res.status(200).json({
//         message: 'ok'
//     })
// }
