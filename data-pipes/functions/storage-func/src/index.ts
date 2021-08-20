import mongoose from "mongoose";
import { event as ev } from "@creativearis/models";

const Model = ev(mongoose);

const http = (req: any, res: any) => {
    res.status(200).send({ ok: "yes" });
};
async function dbConnect() {
    return mongoose.connect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        "mongodb+srv://yurikrupnik:T4eXKj1RBI4VnszC@cluster0.rdmew.mongodb.net/", // todo remove
        // process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log("DB Successfully connected");
            }
        }
    );
}
const storagePubSub = (event: any) => {
    dbConnect().then(() => {
        const message = event.data
            ? Buffer.from(event.data, "base64").toString()
            : "Hello, World";

        console.log("message", message);
        console.log("buffer", Buffer.from(event.data, "base64"));
        const ds = new Model({
            tenantId: "1234567",
            intField: 12356,
            stringField: "ariss here"
        });
        ds.save().then((aa: any) => {
            console.log("aa", aa);
        });
    });
    dbConnect().then(() => {
        const message = event.data
            ? Buffer.from(event.data, "base64").toString()
            : "Hello, World";
        // console.log("event", event);
        console.log("message", message);
        // console.log("context", context);
    });
};

const storageFunc = (event: any) => {
    const gcsEvent = event;
    console.log(`Processing file: ${gcsEvent.name}`);
    console.log("event", event);
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
