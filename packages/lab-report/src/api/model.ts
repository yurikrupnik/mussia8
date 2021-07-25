import { User, user } from "@creativearis/models";
import mongoose from "mongoose";

// type UserGroupDocument = User & Document;
/**
 * @swagger
 * components:
 *   schemas:
 *       Provider:
 *           type: string
 *           default: local
 *           enum:
 *              - local
 *              - google
 *              - github
 *       Role:
 *           type: string
 *           enum: [editor, finance, admin, crm]
 *           default: admin
 *
 *       User:
 *         properties:
 *           _id:
 *               type: string
 *           isActive:
 *               type: boolean
 *               default: true
 *           email:
 *               type: string
 *               example: ad@ad.com
 *           firstName:
 *               type: string
 *           lastName:
 *               type: string
 *           password:
 *               type: string
 *           creditCardNumber:
 *               type: string
 *               default: ''
 *           provider:
 *               type: string
 *               example: local
 *               schema:
 *                   $ref: '#/components/schemas/Provider'
 *           token:
 *               type: string
 *           role:
 *               type: string
 *               schema:
 *                   $ref: '#/components/schemas/Role'
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
