import mongoose, {
    Document,
    Model as Mo,
    Mongoose,
    Schema,
    SchemaTypeOptions
} from "mongoose";
import User from "./user";
// import { dbModel } from "./config";
// import { validateEmail } from "../utils/validation";
// import { generateHashSync } from "../utils/crypt";

// import User from "./user";

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
        ref: User(mongoose)
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

// type ProjectModel = Mo<ProjectDocument>;
//
// const Model: ProjectModel = mongoose.model<ProjectDocument>(
//     dbModel,
//     ProjectsSchema
// );

export default (m: Mongoose): Mo<ProjectDocument> =>
    m.model<ProjectDocument>(dbModel, ProjectsSchema);

const mock: Partial<ProjectFront>[] = [
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

export type { Project, ProjectDocument, ProjectFront };
// export { mock };
