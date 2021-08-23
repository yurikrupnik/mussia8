import mongoose from "mongoose";
import Pusher from "pusher";
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

export { storagePubSub, storageFunc, helloAuth, http };
