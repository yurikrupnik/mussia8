const pubsubBeLogs = (event: any, context: any) => {
    const message = event.data
        ? Buffer.from(event.data, "base64").toString()
        : "Hello, World";
    console.log("message", message); // eslint-disable-line
    console.log("context", context); // eslint-disable-line
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
