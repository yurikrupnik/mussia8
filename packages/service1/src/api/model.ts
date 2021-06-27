import { User, user } from "@creativearis/models";
import mongoose from "mongoose";

// type UserGroupDocument = User & Document;
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
const mock: Partial<User>[] = [
    {
        email: "a@a.com",
        password: "123456"
    },
    {
        email: "b@b.com",
        password: "123452"
    }
];

export default user(mongoose);

export { mock };

// export type { User };
// export { mock };
