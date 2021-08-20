import mongoose from "mongoose";
// import db from "./db";
//
// const route = Router();

// route.use(db);

async function dbConnect() {
    return mongoose.connect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        "mongodb+srv://yurikrupnik:T4eXKj1RBI4VnszC@cluster0.rdmew.mongodb.net/",
        // process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("DB Successfully connected");
            }
        }
    );
}

const pubsubBeLogs = (event: any, context: any) => {
    dbConnect().then((something) => {
        console.log("something", something);
        const message = event.data
            ? Buffer.from(event.data, "base64").toString()
            : "Hello, World";
        console.log("message", message); // eslint-disable-line
        console.log("context", context); // eslint-disable-line
    });
};

const storageFunc = (event: any, context: any) => {
    const gcsEvent = event;
    console.log(`Processing file: ${gcsEvent.name}`);
    console.log("event", event);
    console.log("context", context);
};

const helloAuth = (event: any, context: any) => {
    // The unique id of the user whose auth record changed
    console.log("event", event);
    console.log("context", context);
    const { uid } = event;
    // log out the uid that caused the function to be triggered
    console.log(`Function triggered by change to user: ${uid}`);
    // now log the full event object
    console.log(JSON.stringify(event));
};

export { pubsubBeLogs, storageFunc, helloAuth };
