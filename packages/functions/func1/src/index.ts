import express, { Request, Response, Router } from "express";
import swaggerUi from "swagger-ui-express";
// import { Event } from "@creativearis/models";
import { ExecutionsClient } from "@google-cloud/workflows";
import path from "path";
import os from "os";
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

const client = new ExecutionsClient();

function createExecution(
    project: string,
    location: string,
    name: string,
    data: any
) {
    return client.createExecution({
        parent: client.workflowPath(project, location, name),
        execution: {
            argument: JSON.stringify(data)
        }
    });
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
        createExecution("mussia8", "europe-west4", "workflow-1", {
            firstname: "aris",
            lastname: "rk"
        })
            .then(([s]) => {
                console.log("s", s);
                res.status(204).json(s);
            })
            .catch((err) => {
                console.log(err);
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
