import { Router } from "express";
import Model from "./model";
import { removeOne } from "../utils/methods";

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
 *     responses:
 *       200:
 *         description: A single project object
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/definitions/User'
 *       401:
 *         description: No auth token
 *       500:
 *         description: Error happened
 */
route.get("/", (req, res) => {
    Model.find({}, req.query.projection)
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
 *         schema:
 *           type: string
 *         required:
 *           - id
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

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Service1
 *     name: Find service1 by id
 *     summary: Finds billing information
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
 *         schema:
 *           $ref: '#/definitions/User'
 *         required:
 *           - email
 *           - password
 *     responses:
 *       200:
 *         description: A single project object
 *         schema:
 *              $ref: '#/definitions/User'
 *       401:
 *         description: No auth token
 */
route.post("/", (req, res) => {
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
