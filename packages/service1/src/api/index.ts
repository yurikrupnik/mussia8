import { Router } from "express";
import Model from "./model";

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
 *       401:
 *         description: No auth token
 */
route.get("/", (req, res) => {
    Model.find({}).then((response) => {
        res.status(200).json(response);
    });
});

/**
 * @swagger
 * /{id}:
 *   get:
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
route.get("/:id", (req, res) => {
    res.status(200).send(`ok from get ${req.params.id}`);
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
route.post("/", (req, res) => {
    res.status(200).send(`ok from post ${req.body}`);
});

route.delete("/:id", (req, res) => {
    res.status(200).send(`ok from delete ${req.params.id}`);
});

export default route;
