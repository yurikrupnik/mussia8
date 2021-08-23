import { Event, event as ev } from "@creativearis/models";
import mongoose from "mongoose";

// type UserGroupDocument = User & Document;
/**
 * @swagger
 * components:
 *   schemas:
 *       Event:
 *         properties:
 *           _id:
 *               type: string
 *           intField:
 *               type: number
 *           stringField:
 *               type: string
 *           tenantId:
 *               type: string
 */
const mock: Partial<Event>[] = [
    {
        intField: 4,
        stringField: "re",
        tenantId: "1234"
    },
    {
        intField: 3,
        stringField: "de",
        tenantId: "123452"
    }
];

export default ev(mongoose);

export { mock };

// export type { User };
// export { mock };
