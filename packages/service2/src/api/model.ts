import mongoose from "mongoose";
import { Project, ProjectDocument, project } from "@creativearis/models";

/**
 * @swagger
 * components:
 *      schemas:
 *        Project:
 *          properties:
 *            _id:
 *                type: string
 *            isActive:
 *                type: boolean
 *                default: true
 *            name:
 *                type: string
 *                required: true
 *            description:
 *                type: string
 *            userId:
 *                type: string
 *                required: true
 */

const Model = project(mongoose);

const mock: Partial<Project>[] = [
    {
        name: "Aris1",
        description: "123456"
    },
    {
        name: "Aris2",
        description: "123452"
    }
];

export default Model;

export { mock };

export type { Project, ProjectDocument };
// export { mock };
