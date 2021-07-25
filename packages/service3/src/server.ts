import express from "express";
// import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUI from "@creativearis/swagger"; // fails
// import admin from "firebase-admin";
// import api from "./api";
// import db from "./services/db";

// if (admin.apps.length === 0) {
//     admin.initializeApp({
//         // )
//         // credential: admin.credential.cert("./mussia8-firebase.json")
//     });
// }

const app = express();

console.log("process.env.NODE_ENV", process.env.NODE_ENV); // eslint-disable-line
app.use(
    express.json(),
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(
    swaggerUI(
        process.env.HOST || "http://localhost:5002",
        process.env.NODE_ENV !== "production" ? "dist" : ""
    )
);

app.use((req, res) => {
    res.status(200).json({ message: "all good here" });
});

// app.use(db(databaseUrl));

// app.use((req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//         res.statusCode = 406;
//         res.json({
//             error: "missing auth token"
//         });
//         return;
//     }
//     admin
//         .auth()
//         .verifyIdToken(token)
//         .then((user) => {
//             console.log("user server", user);
//             // req.local.uid = user.uid;
//             next();
//         })
//         .catch((err) => {
//             res.statusCode = 401;
//             res.json(err);
//         });
// });
// app.use(api);

export default app;
