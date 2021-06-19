import mongoose, {
    Document,
    Model as Mo,
    Schema,
    SchemaTypeOptions
} from "mongoose";
// import { dbModel } from "./config";
// import { validateEmail } from "../utils/validation";
// import { generateHashSync } from "../utils/crypt";

const dbModel = "project";

/**
 * @swagger
 * definitions:
 *      Provider:
 *          type: string
 *          default: local
 *          enum:
 *             - local
 *             - google
 *      Role:
 *          type: string
 *          enum: [editor, finance, admin, crm]
 *          default: admin
 *
 *      User:
 *        properties:
 *          _id:
 *              type: string
 *          isActive:
 *              type: boolean
 *              default: true
 *          email:
 *              type: string
 *              required: true
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          password:
 *              type: string
 *              required: true
 *          creditCardNumber:
 *              type: string
 *              default: ''
 *          provider:
 *              type: string
 *              schema:
 *                  $ref: '#/definitions/Provider'
 *          token:
 *              type: string
 *          role:
 *              type: string
 *              schema:
 *                  $ref: '#/definitions/Role'
 */

type ProjectFront = {
    userId: string;
    name: string;
    description: string;
    isActive: boolean;
    // aris?: string;
};

type Project = ProjectFront;

type ProjectDocument = Project & Document;

const projectsGroupSchemaObj: Record<keyof Project, SchemaTypeOptions<any>> = {
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true
    }
};

// if (process.env.IS_OFFLINE) {
// delete mongoose.connection.models[dbModel];
// }

const ProjectsSchema: Schema = new Schema(projectsGroupSchemaObj);

type ProjectModel = Mo<ProjectDocument>;

const Model: ProjectModel = mongoose.model<ProjectDocument>(
    dbModel,
    ProjectsSchema
);

const mock: Partial<ProjectFront>[] = [
    {
        name: "Aris1",
        description: "123456"
    },
    {
        name: "Aris2",
        description: "123452"
    }
    // {
    //     name: "Group 3"
    // },
    // {
    //     name: "Group 4"
    // },
    // {
    //     name: "Group 5"
    // }
];

export default Model;

export { mock };

export type { Project, ProjectDocument, ProjectFront };
// export { mock };
