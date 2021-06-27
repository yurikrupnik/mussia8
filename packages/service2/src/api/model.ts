import mongoose from "mongoose"; // SchemaTypeOptions // Schema, // Model as Mo, // Document,
import { Project, ProjectDocument, project } from "@creativearis/models";

// import { dbModel } from "./config";
// import { validateEmail } from "../utils/validation";
// import { generateHashSync } from "../utils/crypt";

// const dbModel = "project";

// console.log("Projectds", Projectds);
/**
 * @swagger
 * definitions:
 *      Project:
 *        properties:
 *          _id:
 *              type: string
 *          isActive:
 *              type: boolean
 *              default: true
 *          name:
 *              type: string
 *              required: true
 *          description:
 *              type: string
 *          userId:
 *              type: string
 *              required: true
 */

// Users(mongoose);

// type ProjectFront = {
//     userId: string;
//     name: string;
//     description: string;
//     isActive: boolean;
//     // aris?: string;
// };
//
// type Project = ProjectFront;
//
// type ProjectDocument = Project & Document;
//
// const projectsGroupSchemaObj: Record<keyof Project, SchemaTypeOptions<any>> = {
//     userId: {
//         type: mongoose.Types.ObjectId,
//         ref: Users(mongoose)
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         default: ""
//     },
//     isActive: {
//         type: Boolean,
//         default: true
//     }
// };

// if (process.env.IS_OFFLINE) {
// delete mongoose.connection.models[dbModel];
// }

// const ProjectsSchema: Schema = new Schema(projectsGroupSchemaObj);
//
// type ProjectModel = Mo<ProjectDocument>;

const Model = project(mongoose);

const mock: Partial<Project>[] = [
    {
        name: "Aris1",
        description: "123456"
        // userId: "60ce4e24f858601f6cfcbe82"
    },
    {
        name: "Aris2",
        description: "123452"
        // userId: "60ce4e24f858601f6cfcbe82"
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

// Model.find((res) => {
//     if (!res) {
//         Model.insertMany(mock);
//     }
// });

export { mock };

export type { Project, ProjectDocument };
// export { mock };
