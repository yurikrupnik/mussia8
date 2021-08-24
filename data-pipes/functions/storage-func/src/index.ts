import mongoose from "mongoose";
import Pusher from "pusher";
import { Request, Response } from "express";
import { Storage } from "@google-cloud/storage";
import { event as ev } from "@creativearis/models";

const storage = new Storage();

const Model = ev(mongoose);

const http = (req: any, res: any) => {
    res.status(200).send({ ok: "yes" });
};
function dbConnect() {
    return mongoose
        .connect(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            "mongodb+srv://yurikrupnik:T4eXKj1RBI4VnszC@cluster0.rdmew.mongodb.net/", // todo remove
            // process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .catch((err) => {
            console.log("Connecting Mongo failed with: ", err);
        });
}

const storagePubSub = (event: any) => {
    dbConnect()
        .then(() => {
            const message = event.data
                ? Buffer.from(event.data, "base64").toString()
                : "";

            console.log("message", message); // eslint-disable-line

            const newEvent = new Model(JSON.parse(message));

            newEvent
                .save()
                .then((item) => {
                    console.log("Added new item: ", item); // eslint-disable-line
                    const pusher = new Pusher({
                        appId: "1253889",
                        key: "d7880526d3965e004014",
                        secret: "340b5283bedf5bc81888",
                        cluster: "eu",
                        useTLS: true
                    });

                    pusher.trigger("my-channel", "my-event", {
                        logId: item._id
                    });
                })
                .catch((err) => {
                    console.log("Error saving new event", err);
                });
        })
        .catch((err) => {
            console.log("err", err);
        });
};

const storageFunc = (event: any) => {
    if (!event.name.includes(".temp-beam") && !event.name.includes("avro")) {
        const bucketName: string = event.bucket;
        const bucket = storage.bucket(bucketName);
        const remoteFile = bucket.file(event.name);
        console.log("Reading File");
        const archivo = remoteFile.createReadStream();

        console.log("Concat Data");
        let buf = "";
        archivo
            .on("data", (d) => {
                console.log("data", d);
                const jsob = Buffer.from(d, "base64");
                // const jsob1 = Buffer.from(JSON.parse(d), "base64");
                console.log("jsob", jsob);
                // console.log("jsob1", jsob1);
                buf += d;
            })
            .on("end", () => {
                console.log(buf);
                console.log("End");
            });
    }
    // console.log("context", context);
};

const saveToDb = (req: Request, res: Response) =>
    dbConnect().then(() => {
        console.log("req.query", req.query); // eslint-disable-line
        console.log("req.body", req.body); // eslint-disable-line
        const newEvent = new Model(req.body);

        newEvent
            .save()
            .then((item) => {
                console.log("Added new item: ", item); // eslint-disable-line
                res.status(200).json(item);
            })
            .catch((err) => {
                console.log("Failed with: ", err); // eslint-disable-line
                res.status(500).json(err);
            });
    });

const publishToClient = (req: Request, res: Response) => {
    console.log("req.query", req.query); // eslint-disable-line
    console.log("req.body", req.body); // eslint-disable-line
    const pusher = new Pusher({
        appId: "1253889",
        key: "d7880526d3965e004014",
        secret: "340b5283bedf5bc81888",
        cluster: "eu",
        useTLS: true
    });

    pusher.trigger("my-channel", "my-event1", {
        logId: req.body._id
    });
    res.status(204).send();
};

// async function main() {
//     // [START workflows_create_execution]
//     /**
//      * TODO(developer): Uncomment these variables before running the sample.
//      */
//     const projectId = "mussia8";
//     const location = "us-central1";
//     const name = "my-test-workflow";
//     const { ExecutionsClient } = require("@google-cloud/workflows");
//     const client = new ExecutionsClient();
//     async function createExecution() {
//         const [resp] = await client.createExecution({
//             parent: client.workflowPath(projectId, location, name)
//         });
//         console.info(`name: ${resp.name}`);
//     }
//     createExecution();
//     // [END workflows_create_execution]
// }

const helloAuth = (event: any, context: never) => {
    // The unique id of the user whose auth record changed
    console.log("event", event);
    console.log("context", context);
    const { uid } = event;
    // log out the uid that caused the function to be triggered
    console.log(`Function triggered by change to user: ${uid}`);
    // now log the full event object
    console.log(JSON.stringify(event));
};

export {
    storagePubSub,
    storageFunc,
    helloAuth,
    http,
    saveToDb,
    publishToClient
};
