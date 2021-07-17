// // const assert = require('assert');
// // const sinon = require('sinon');
// // const uuid = require('uuid');
// import { Request, Response } from "express";
import request from "supertest";
// const { func2 } = require("../index");
import { func1 } from "../index";
//
it("should ", () => {
    expect(1).toBe(1);
});
// function chainObject(this: never) {
//     return this;
// }
describe("GET /fun1", () => {
    it("responds with json", (done) => {
        request(func1)
            .get("/fun1")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                console.log("response", response.body);
                // assert(response.body.email, "foo@bar.com");
                done();
            });
    });
});

describe("GET /dam", () => {
    it("responds with json", (done) => {
        request(func1)
            .get("/dam")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});
//
// // todo fix - fails
// // describe("GET /swagger", () => {
// //     it("responds with json", async (done) => {
// //         request(func1)
// //             .get("/swagger")
// //             // .set("Accept", "application/json")
// //             // .expect("Content-Type", /text/)
// //             // .expect("Content-Type", /json/)
// //             .expect("Content-Type", "text/html; charset=utf-8")
// //
// //             .expect(200, done);
// //     });
// // });
//
describe("GET /doc", () => {
    it("responds with html", (done) => {
        request(func1)
            .get("/doc/")
            .set("Accept", "text/html")
            .expect("Content-Type", /html/)

            .expect(200, done);
    });
});

// it("func1 test", () => {
//     //     // Mock ExpressJS 'req' and 'res' parameters
//     //     // const name = uuid.v4();
//     // ts-ignore-next-line
//     const req = {
//         url: "/dam"
//         // query: {},
//         // body: {
//         //     name: "yuri"
//         // }
//     };
//
//     const json = jest.fn();
//     // const stub = sinon.stub();
//
//     const res = { status: jest.fn(chainObject), json };
//
//     //     // console.log('s', s);
//     //     // Call tested function
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     func1(<Request>req, res);
//     expect(json).toHaveBeenCalledTimes(1);
//     expect(json).toHaveBeenCalledWith({ ok: "yes" });
//     //     // expect(send.calls.length).toHaveBeenCalledTimes(1)
//     //     // console.log('res.send.mock.calls', res.send.mock.calls);
//     //     // console.log('res.send.mock.calls', res.send.calls.length);
//     //     // expect(res.send.mock.calls).toEqual([
//     //     //     '4'
//     //     // ]);
//     //     // Verify behavior of tested function
//     //     // assert.ok(res.send.calledOnce);
//     //     // assert.deepStrictEqual(res.send.firstCall.args, [{ all: 'ssssssd' }]);
// });
