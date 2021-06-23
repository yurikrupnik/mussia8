import { Router } from "express";
// import Model, { Project } from "@creativearis/models";
import Model from "./model";
import { removeOne } from "../utils/methods";
//
const route = Router();
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Service1
 *     name: Find Service1
 *     summary: Finds Service1 information
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: projection
 *         type: string
 *         required: false
 *         description: Array or string with spaces projection keys to fetch
 *       - in: query
 *         name: email
 *         type: string
 *         description: Search by email
 *     responses:
 *       200:
 *         description: A single project object
 *         schema:
 *            items:
 *              $ref: '#/definitions/User'
 *       401:
 *         description: No auth token
 *       500:
 *         description: Error happened
 */
route.get("/", (req, res) => {
    const { projection } = req.query;
    console.log("req.query before", req.query);
    delete req.query.projection;
    // console.log("DS", DS);
    // console.log("S", Project);
    // console.log("Models", Models);
    console.log("Model", Model);
    // res.status(200).json({ ok: true });
    // console.log("req.query after", req.query);
    Model.find(req.query, projection)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err.message);
        });
});

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Service1
 *     name: Find service1 by id
 *     summary: Finds users information
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user object
 *         schema:
 *              $ref: '#/definitions/User'
 *       401:
 *         description: No auth token
 *       500:
 *         description: No item found
 */
route.get("/:id", (req, res) => {
    Model.findById(req.params.id, req.query.projection)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err.message);
        });
});

/**         schema:
 *           $ref: '#/definitions/User'*/

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
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Pet object that needs to be added to the store
 *         required:
 *           - email
 *           - password
 *         schema:
 *            $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: A single project object
 *         schema:
 *              $ref: '#/definitions/User'
 *       401:
 *         description: No auth token
 */
route.post("/", (req, res) => {
    // console.log('req', req.body);
    // res.status(200).send('on')
    Model.create(req.body)
        .then((entity) => {
            res.status(200).json(entity);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Service1
 *     name: Delete user by id
 *     summary: Delete user information
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required:
 *           - id
 *     responses:
 *       200:
 *         description: A single project object
 *       401:
 *         description: No auth token
 */
route.delete("/:id", removeOne(Model));
// route.delete("/", (req, res) => {
//     res.status(200).json({
//         message: "removed many"
//     });
// }); // remove many

export default route;
