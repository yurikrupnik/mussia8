import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";
import admin from "firebase-admin";
import User from "../../../models/User";
// import functions from "firebase-functions";
import { all } from "../../../middlewares";
// import { create, list, update } from "../../../utils/methods";

// import Model from "../../../models/User";
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert("./mussia8-firebase.json")
    });
}

// const createUserDocument = functions;

const handler = nc().use(all);
// const handler = nc().use(all);

// function getHello() {
//     return axios.get("https://aris-8jo9nv6l.ew.gateway.dev/hello");
//     // .then((resp) => {
//     //     res.statusCode = 200;
//     //     res.json(resp);
//     // })
//     // .catch((err) => {
//     //     res.statusCode = 500;
//     //     res.json(err.message);
//     // });
// }

const auth = (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.statusCode = 406;
        res.json({
            error: "missing auth token"
        });
        return;
    }
    admin
        .auth()
        .verifyIdToken(token)
        .then((user) => {
            console.log("user server", user);
            // req.local.uid = user.uid;
            next();
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json(err);
        });
};

// const handleUser = (req: NextApiRequest, res: NextApiResponse) => {
//     User.find()
//         .then((response) => {
//             res.status(200).json(response);
//         })
//         .catch((err) => {
//             res.status(500).json(err);
//         });
// };

// const handlefirestore = (req: NextApiRequest, res: NextApiResponse) => {
//     admin
//         .firestore()
//         .collection("pets")
//         // .where("name", "==", "cow")
//         // .limit(10)
//         .doc(req.query.id)
//         //     // .doc()
//         .get()
//         .then((rew) => {
//             // const d = rew.docs.map((item) => {
//             //     const { id } = item;
//             //     return {
//             //         id,
//             //         ...item.data()
//             //     };
//             // });
//             res.statusCode = 200;
//             res.json(rew.data());
//         });
// };

handler.get(auth, (req: NextApiRequest, res: NextApiResponse) => {
    console.log("req.query", req.query);
    // const token = req.headers.authorization?.split(" ")[1];
    // admin
    //     .storage()
    //     .bucket("mussia8.appspot.com")
    //     // .get()
    //     .file(`${token}/openapi2-run.yaml`)
    //     .download()
    //     .then((r) => {
    //         console.log({ r });
    //         res.status(200).json(r.toString());
    //     })
    //     .catch((err) => {
    //         res.status(500).json(err);
    //     });
    // console.log("req.query", req.query); // eslint-disable-line
    // console.log("req.headers", req.headers); // eslint-disable-line
    User.find()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    // res.status(200);
    // res.json({ aris: true });
    // getHello()
    //     // Model.find()
    //     .then((resp) => {
    //     })
    //     .catch((err) => {
    //         res.statusCode = 500;
    //         res.json(err.message);
    //     });
    // res.json({ status: "ok" });
});

// handler.get(list(Model));
// handler.post(create(Model));
// handler.put(update(Model));

export default handler;
