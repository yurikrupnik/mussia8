import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { all } from "../../../middlewares";
// import { create, list, update } from "../../../utils/methods";

// import Model from "../../../models/User";

const handler = nc().use(all);

function getHello() {
    return axios.get("https://aris-8jo9nv6l.ew.gateway.dev/hello");
    // .then((resp) => {
    //     res.statusCode = 200;
    //     res.json(resp);
    // })
    // .catch((err) => {
    //     res.statusCode = 500;
    //     res.json(err.message);
    // });
}

handler.get((req: NextApiRequest, res: NextApiResponse) => {
    // console.log("req.query", req.query); // eslint-disable-line
    // console.log("req.headers", req.headers); // eslint-disable-line
    // res.status(200);
    // res.json({ aris: true });
    getHello()
        // Model.find()
        .then((resp) => {
            res.statusCode = 200;
            res.json(resp.data);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json(err.message);
        });
    // res.json({ status: "ok" });
});

// handler.get(list(Model));
// handler.post(create(Model));
// handler.put(update(Model));

export default handler;
