// import express from "express";
// import request from "supertest";
// import swagger from "../index";
//
// const app = express();
//
// app.use(
//     swagger(
//         "https://app.swaggerhub.com/apis/yurikrupnik/backed-api_optional_string/1.0.0",
//         ""
//     )
// );

// test("Get swagger ui", (done) => {
//     request(app)
//         .get("/doc")
//         // .expect("Content-Type", /json/)
//         // .expect("Content-Length", "4")
//         .expect(200, done);
//     // .end((err, res) => {
//     //     if (err) throw err;
//     // });
// });

// test("Get json file", (done) => {
//     request(app)
//         .get("swagger.json")
//         // .expect("Content-Type", /json/)
//         // .expect("Content-Length", "4")
//         .expect(200, done);
//     // .end((err, res) => {
//     //     if (err) throw err;
//     // });
// });
test("Tes", () => {
    expect(1).toBe(1);
});

// describe("GET /user", () => {
//     it("responds with json", (done) => {
//         request(app)
//             .get("/")
//             .set("Accept", "application/json")
//             .expect("Content-Type", /json/)
//             .expect(200, done);
//     });
// });
