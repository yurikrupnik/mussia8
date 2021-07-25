import { Router } from "express";
// import Model from "./model";
import { PubSub } from "@google-cloud/pubsub";

const pubsub = new PubSub();

async function publishPubSubMessage(topic: string, message: string) {
    const buffer = Buffer.from(JSON.stringify(message));
    const ss = await pubsub.topic(topic).publish(buffer);
    console.log({ ss }); // eslint-disable-line
}

const subscription = pubsub.subscription("new-lab-report-sub");

subscription.on("event", (message) => {
    console.log("---->>>>>> Received message:", message.data.toString());
    process.exit(0);
});

const route = Router();

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Service1
 *     name: Find service1 by id
 *     summary: Creates service1 information
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 *              editor:
 *                value:
 *                  email: editor@a.com
 *                  password: "123456"
 *                  role: editor
 *              finance:
 *                value:
 *                  email: finance@a.com
 *                  password: "123456"
 *                  role: finance
 *              google:
 *                value:
 *                  email: finance@a.com
 *                  password: "123456"
 *                  provider: google
 *              github:
 *                value:
 *                  email: finance@a.com
 *                  password: "123456"
 *                  provider: github
 *     responses:
 *       201:
 *         description: A single project object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No auth token
 */
route.post("/", async (req, res) => {
    console.log("req", req.body); // eslint-disable-line
    console.log("JSON.stringify(req.body)", JSON.stringify(req.body)); // eslint-disable-line
    await publishPubSubMessage("new-lab-report", JSON.stringify(req.body));
    res.status(204).send();
});

export default route;
