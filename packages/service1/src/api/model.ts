import mongoose, {
    Document,
    Model as Mo,
    Schema,
    SchemaTypeOptions
} from "mongoose";
// import { dbModel } from "./config";
import { validateEmail } from "../utils/validation";
import { generateHashSync } from "../utils/crypt";

type roles = "editor" | "finance" | "admin" | "crm";
type providers = "local" | "google";

const usersRoles = ["editor", "finance", "admin", "crm"];

const dbModel = "user";

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

type UserGroupFront = {
    email: string;
    password: string;
    // token: string;
    role: roles;
    image: string;

    firstName: string;
    // id?: string;
    lastName?: string;
    // fullName?: string;

    isActive?: boolean;
    creditCardNumber?: string;
    provider: providers;
    // aris?: string;
};

type UserGroup = UserGroupFront;

type UserGroupDocument = UserGroup & Document;

const userGroupSchemaObj: Record<keyof UserGroup, SchemaTypeOptions<any>> = {
    creditCardNumber: {
        type: String,
        transform: (str: string) => {
            if (str) {
                return `****-****-****-${str.substr(str.length - 4)}`;
            }
            return null;
        },
        default: ""
        // get: (str: string) => {
        //     if (str) {
        //         return `****-****-****-${str.substr(str.length - 4)}`;
        //     }
        //     return null;
        // },
    },
    // aris: {
    //     type: String,
    //     default: "d",
    // },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    // id: {
    //     type: String,
    //     required() {
    //         return this.provider !== "local";
    //     }
    // },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Email address is required"],
        validate: [validateEmail, "Please fill a valid email address"],
        // match: [emailReg, "pls"],
        // match: emailReg,
        index: true
    },
    // token: {
    //     type: String,
    //     default: ""
    // },
    password: {
        type: String,
        required() {
            return this.provider === "local";
        },
        // required: true,
        // required: function() [{ return this.a === 'test'; }, 'YOUR CUSTOME MSG HERE']
        set: generateHashSync
    },
    role: {
        type: String,
        enum: usersRoles,
        default: "admin"
    },
    image: {
        type: String,
        default: ""
    },
    firstName: {
        type: String,
        required() {
            return this.provider !== "local";
        }
    },
    lastName: {
        type: String,
        required() {
            return this.provider !== "local";
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
};

// if (process.env.IS_OFFLINE) {
// delete mongoose.connection.models[dbModel];
// }

const UsersSchema: Schema = new Schema(userGroupSchemaObj);

type UserGroupModel = Mo<UserGroupDocument>;

const Model: UserGroupModel = mongoose.model<UserGroupDocument>(
    dbModel,
    UsersSchema
);

const mock: Partial<UserGroupFront>[] = [
    {
        email: "a@a.com",
        password: "123456"
    },
    {
        email: "b@b.com",
        password: "123452"
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

export type { UserGroup, UserGroupDocument, UserGroupFront };
// export { mock };
