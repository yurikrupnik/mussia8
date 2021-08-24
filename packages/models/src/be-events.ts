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
 *      Event:
 *        properties:
 *          _id:
 *              type: string
 *          stringField:
 *              type: string
 *          tenantId:
 *              type: string
 *              required: true
 *          intField:
 *              type: number
 */

type Event = {
    _id: string;
    stringField: string;
    tenantId: string;
    intField: number;
};

// type UserGroup = UserGroupFront;

type EventDocument = Event & Document;

const userGroupSchemaObj: Record<
    keyof Omit<Event, "_id">,
    SchemaTypeOptions<any>
> = {
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
