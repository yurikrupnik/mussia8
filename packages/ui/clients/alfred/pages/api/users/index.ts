import nc from "next-connect";
// import { NextApiRequest, NextApiResponse } from "next";
// import { PubSub } from "@google-cloud/pubsub";
// import { NextApiRequest, NextApiResponse } from "next";
import { all } from "../../../middlewares";
import { list } from "../../../utils/methods";

import Model from "../../../models/User";

// const pubsub = new PubSub();

// async function publishPubSubMessage(topic: string, message: string) {
//     const buffer = Buffer.from(JSON.stringify(message));
//     try {
//         await pubsub.topic(topic).publish(buffer);
//     } catch (err) {
//         console.log("eer", err); // eslint-disable-line
//     }
//     // console.log({ ss }); // eslint-disable-line
// }

const handler = nc().use(all);

// function getUsers() {
//     return Model.find()
//         .then((resp) => {
//             res.statusCode = 200;
//             res.json(resp);
//         })
//         .catch((err) => {
//             res.statusCode = 500;
//             res.json(err.message);
//         });
// }
// async (req: NextApiRequest, res: NextApiResponse, next) => {
//     await publishPubSubMessage(
//         "requests-report",
//         JSON.stringify({
//             // query: req.query,
//             // params: {},
//             url: req.url,
//             method: req.method
//         })
//     );
//     return next;
// }
handler.get(list(Model));

// handler.get(list(Model));
// handler.post(create(Model));
// handler.put(update(Model));

export default handler;
