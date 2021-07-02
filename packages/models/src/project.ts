import {
    Document,
    Model as Mo,
    Mongoose,
    Schema,
    SchemaTypeOptions
} from "mongoose";

import user from "./user";

const dbModel = "project";

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

type Project = {
    userId: string;
    name: string;
    description: string;
    isActive: boolean;
    // aris?: string;
};

type ProjectDocument = Project & Document;

export default (m: Mongoose): Mo<ProjectDocument> => {
    const projectsGroupSchemaObj: Record<
        keyof Project,
        SchemaTypeOptions<any>
    > = {
        userId: {
            type: m.Types.ObjectId,
            ref: user(m)
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

    const ProjectsSchema: Schema = new Schema(projectsGroupSchemaObj);
    return m.model<ProjectDocument>(dbModel, ProjectsSchema);
};

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

// export default Model;

// Model.find((res) => {
//     if (!res) {
//         Model.insertMany(mock);
//     }
// });

export { mock };

export type { Project, ProjectDocument };
// export { mock };
