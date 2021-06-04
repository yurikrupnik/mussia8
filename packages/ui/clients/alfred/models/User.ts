import mongoose, {
    // Document,
    Model as Mo,
    Schema,
    SchemaTimestampsConfig,
    SchemaTypeOpts
} from "mongoose";

import bcrypt from "bcrypt";
// import { dbModel, usersRoles } from "./config";
// import { validateEmail } from "../../utils/validation";
// import { MongoModel, SchemaFilter } from "../../types";
// import { generateHashSync } from "../../services/passport/crypt";
const generateHashSync = (password: string) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

type SchemaFilter = "createdAt" | "updatedAt";

const emailReg = /^([\w-/.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const validateEmail = (email: string) => emailReg.test(email);

const dbModel = "Users";
const usersRoles = ["editor", "finance", "admin", "crm"];

// type Users = im Pick<SchemaTimestampsConfig, SchemaFilter> {
//     email: string;
//     password: string;
//     token: string;
//     role: string;
//     image: string;
//
//     firstName: string;
//     lastName?: string;
//     fullName?: boolean;
//
//     isActive?: boolean;
//     creditCardNumber?: string;
// }

interface UserFront {
    email: string;
    password: string;
    token: string;
    role: string;
    image: string;

    firstName: string;
    // id?: string;
    lastName?: string;
    fullName?: boolean;

    isActive?: boolean;
    creditCardNumber?: string;
    provider: "local" | "google";
}

// type UserFront = {
//     email: string;
//     password: string;
//     token: string;
//     role: string;
//     image: string;
//
//     firstName: string;
//     // id?: string;
//     lastName?: string;
//     fullName?: boolean;
//
//     isActive?: boolean;
//     creditCardNumber?: string;
//     provider: "local" | "google";
// };

type User = Pick<SchemaTimestampsConfig, SchemaFilter> & UserFront;

// interface User extends Pick<SchemaTimestampsConfig, SchemaFilter> {
//     email: string;
//     password: string;
//     token: string;
//     role: string;
//     image: string;
//
//     firstName: string;
//     // id?: string;
//     lastName?: string;
//     fullName?: boolean;
//
//     isActive?: boolean;
//     creditCardNumber?: string;
//     provider: "local" | "google";
// }

type UserDocument = User & Document;
// type UserDocument = User;
// interface UserDocument extends User,Document

delete mongoose.connection.models[dbModel];

const userSchemaObj: Record<
    keyof Omit<User, SchemaFilter | "fullName">,
    SchemaTypeOpts<any>
> = {
    creditCardNumber: {
        type: String,
        transform: (str: string) => {
            if (str) {
                return `****-****-****-${str.substr(str.length - 4)}`;
            }
            return null;
        }
        // get: (str: string) => {
        //     if (str) {
        //         return `****-****-****-${str.substr(str.length - 4)}`;
        //     }
        //     return null;
        // },
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    // id: {
    //     type: String
    //     // required() {
    //     //     return this.provider !== "local";
    //     // },
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
    token: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        // required() {
        //     return this.provider === "local";
        // },
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
        required: true
    },
    lastName: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true
    }
};

const UsersSchema: Schema = new Schema(userSchemaObj, {
    timestamps: true,
    toJSON: { virtuals: true, getters: true }
});

UsersSchema.virtual("fullName").get(function fullName(this: UserDocument) {
    return `${this.firstName} ${this.lastName}`;
});

UsersSchema.statics.hashPassword = function findByName(id: string) {
    return this.find({ name: new RegExp(id, "i") });
};

UsersSchema.query.byName = function byName(name: string) {
    return this.where({ name: new RegExp(name, "i") });
};

// UsersSchema.methods.findSimilarName = function getFullname(
//     this: UserDocument,
//     a
// ) {
//     this.model(dbModel).find({ name: this.firstName }, a);
//     // return `${this.email}ar`;
// };
//
// UsersSchema.statics.findWithShit = function findWithShit(id: string) {
//     return this.findOne(id);
// };
//
// async function preFindOneAndUpdates<T>(this: UpdateQuery<T>) {
//     if (this._update.password) {
//         this._update.password = await generateHash(this._update.password);
//     }
// }
//
// async function preSave(this: UserDocument, next: HookNextFunction) {
//     if (this.isModified("password")) {
//         this.password = await generateHash(this.password);
//     }
//     next();
// }

// UsersSchema.pre("findOne", function ad() {
//     console.log({this})
// });
// UsersSchema.pre("findOneAndUpdate", preFindOneAndUpdates);
// //
// UsersSchema.pre("save", preSave);

// type UserModels = <UserDocument, MongoModel<UserDocument>> {}
// interface ds extends UserDocument, MongoModel<UserDocument> {}
// type UserModel = Mo<UserDocument, MongoModel<UserDocument>>;

// interface MongoModel<T extends Document> extends Mo<T> {
//     [key: string]: unknown;
// }
type UserModel = Mo<UserDocument>;
// interface UserModel extends Mo<UserDocument> {
//     findMyCompany(id: string): Promise<any>;
// }
// type UserModel = Mo<UserDocument>;

const Model: UserModel = mongoose.model<UserDocument>(dbModel, UsersSchema);

const mock: User[] = [
    {
        isActive: true,
        email: "a@a.com",
        token: "he",
        password: "rtl",
        role: "admin",
        image: "https://restcountries.eu/data/isr.svg",
        firstName: "aris 1",
        creditCardNumber: "8585 8585 8585 8588",
        provider: "local"
    },
    {
        isActive: true,
        email: "b@b.com",
        token: "he",
        password: "rtl",
        role: "admin",
        image: "https://restcountries.eu/data/isr.svg",
        firstName: "aris 1",
        provider: "local"
    },
    {
        isActive: true,
        email: "c@c.com",
        token: "he",
        password: "rtl",
        role: "admin",
        image: "https://restcountries.eu/data/isr.svg",
        firstName: "aris",
        provider: "local"
    }
];

Model.find({}).then((res) => {
    // console.log("res.fullName", res.fullName);
    // res.find;
    if (!res.length) {
        Model.insertMany(mock);
    }
});

// Model.findMyCompany()
// Model.create({}).then((r) => {
//     // r.fi
//     // r.byN
// });

// Model.findByName

// Model.findById('12').then((r) => {
//     r.provi
// })

export default Model;

export type { User, UserDocument, UserModel, UserFront };
export { mock };
