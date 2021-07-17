import { CloudTasksClient } from "@google-cloud/tasks";

import { GCLOUD_LOCATION, GCLOUD_PROJECT } from "./utils";

async function listQueues() {
    const client = new CloudTasksClient();
    // Get the fully qualified path to the region
    const parent = client.locationPath(GCLOUD_PROJECT, GCLOUD_LOCATION);

    // list all fo the queues
    const [queues] = await client.listQueues({ parent });

    if (queues.length > 0) {
        console.log("Queues:");
        queues.forEach((queue: any) => {
            console.log(`  ${queue.name}`);
        });
    } else {
        console.log("No queues found!");
    }
    return queues;
}

async function nequeue(record: any) {
    const task = {
        httpRequest: {
            // httpMethod: "PUT",
            httpMethod: "POST",
            url: "https://ptsv2.com/t/slkmj-1626545456/post",
            headers: {
                "content-type": "application/json"
            },
            body: Buffer.from(JSON.stringify(record)).toString("base64")
        }
    };
    const client = new CloudTasksClient();
    const parent = client.queuePath(
        GCLOUD_PROJECT,
        GCLOUD_LOCATION,
        "my-queue"
    );
    const request = { parent, task };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [response] = await client.createTask(request);
    const { name } = response;
    console.log("response", response); // eslint-disable-line
    console.log("Name", name); // eslint-disable-line
}

async function createHttpTask(payload: string, inSeconds = 60) {
    const client = new CloudTasksClient();
    // TODO(developer): Uncomment these lines and replace with your values.
    // const project = 'my-project-id';
    // const queue = 'my-queue';
    // const location = 'us-central1';
    // const url = 'https://example.com/taskhandler';
    // const payload = 'Hello, World!';
    // const inSeconds = 180;

    // Construct the fully qualified queue name.
    const parent = client.queuePath(
        GCLOUD_PROJECT,
        GCLOUD_LOCATION,
        "my-queue"
    );

    const task = {
        httpRequest: {
            httpMethod: "POST",
            url: "https://ptsv2.com/t/slkmj-1626545456/post"
            // body: Buffer.from(payload).toString("base64"),
            // scheduleTime: {
            //     seconds: inSeconds + Date.now() / 1000
            // }
        }
    };

    if (payload) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        task.httpRequest.body = Buffer.from(payload).toString("base64");
    }

    if (inSeconds) {
        // The time when the task is scheduled to be attempted.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        task.scheduleTime = {
            seconds: inSeconds + Date.now() / 1000
        };
    }
    // Send create task request.
    console.log("Sending task:"); // eslint-disable-line
    console.log(task); // eslint-disable-line
    const request = { parent, task };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [response] = await client.createTask(request);
    console.log(`Created task`, response); // eslint-disable-line
    console.log(`Created task ${response.name}`); // eslint-disable-line
    return response;
}

export { nequeue, listQueues, createHttpTask };
