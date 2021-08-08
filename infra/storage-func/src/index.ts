const http = (req: any, res: any) => {
    res.status(200).send({ ok: "yes" });
};

const storagePubSub = (event: any, context: any) => {
    const message = event.data
        ? Buffer.from(event.data, "base64").toString()
        : "Hello, World";
    console.log("event", event);
    console.log("message", message);
    console.log("context", context);
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

export { storagePubSub, storageFunc, helloAuth, http };
