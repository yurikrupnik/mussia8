import { Router } from "express";
import Model from "./model";
import { removeOne, update } from "../utils/methods";

const route = Router();
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Service2
 *     name: Find Service2
 *     summary: Finds Service2 information
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
 *         name: userId
 *         type: string
 *         description: Search by userId
 *     responses:
 *       200:
 *         description: A single project object
 *         content:
 *             application/json:
 *               type: array
 *               schema:
 *                 items:
 *                   $ref: '#/components/schemas/Project'
 *       401:
 *         description: No auth token
 *       500:
 *         description: Error happened
 */
route.get("/", (req, res) => {
    const { projection } = req.query;
    // console.log("req.query before", req.query);
    delete req.query.projection;
    // console.log("req.query after", req.query);
    Model.find(req.query, projection)
        .populate("userId", "role _id")
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
 *       - Service2
 *     name: Find service2 by id
 *     summary: Finds service2 information
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
 *       - in: query
 *         name: projection
 *         type: string
 *         required: false
 *         description: Array or string with spaces projection keys to fetch
 *     responses:
 *       200:
 *         description: A single user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *             example:
 *                  {
 *                      _id: "123",
 *                      userId: "id1",
 *                      isActive: true,
 *                      name: "Name1",
 *                      description: "Something describe item"
 *                  }
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
 *           $ref: '#/definitions/Project'*/

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Service2
 *     name: Find service1 by id
 *     summary: Creates service2 information
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
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: A single project object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
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
 *       - Service2
 *     name: Delete service2 item by id
 *     summary: Delete service2 information
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
 *       202:
 *         description: A single project object
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       401:
 *         description: No auth token
 */
route.delete("/:id", removeOne(Model));

/**
 * @swagger
 * /:
 *   put:
 *     tags:
 *       - Service2
 *     name: Update
 *     summary: Update service2 information
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
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: A single project object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       401:
 *         description: No auth token
 */
route.put("/", update(Model));
// route.delete("/", (req, res) => {
//     res.status(200).json({
//         message: "removed many"
//     });
// }); // remove many

export default route;
