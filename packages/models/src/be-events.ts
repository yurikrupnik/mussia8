import {
    Document,
    Model as Mo,
    Mongoose,
    Schema,
    SchemaTypeOptions
} from "mongoose";

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
 *      Event:
 *        properties:
 *          stringField:
 *              type: string
 *          tenantId:
 *              type: string
 *              required: true
 *          intField:
 *              type: number
 */

type Event = {
    stringField: string;
    tenantId: string;
    intField?: number;
};

// type UserGroup = UserGroupFront;

type EventDocument = Event & Document;

const userGroupSchemaObj: Record<keyof Event, SchemaTypeOptions<any>> = {
    stringField: {
        type: String
    },
    tenantId: {
        type: String
    },
    intField: {
        type: Number
    }
};

const EventsSchema: Schema = new Schema(userGroupSchemaObj);

export default (m: Mongoose): Mo<EventDocument> =>
    m.model<EventDocument>("event", EventsSchema);

export { EventsSchema };

export type { Event, EventDocument };
