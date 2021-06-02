import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";

const responseId = (req: Request, res: Response) => {
    const { id } = req.query;
    const statusCode = 202;
    return () => res.status(statusCode).json(id);
};

const handleError = (res: Response) => {
    const statusCode = 500;
    return (err: Error) => res.status(statusCode).send(err);
};

function respondWithResult<T>(res: Response) {
    return (entity: T) => {
        if (!entity) {
            console.log("null entitiy fix error", entity); // eslint-disable-line
            // res.statusCode = 404;
            // res.end();
            res.status(200).json(null);
        } else {
            // console.log(entity);
            res.status(200).json(entity);
        }
    };
}

const list = (Model: any) => (req: Request, res: Response) => {
    Model.find(req.query).then(respondWithResult(res)).catch(handleError(res));
};

// changed from express params to query - next way for dynamic routes
const find =
    (Model: mongoose.Model<Document>) => (req: Request, res: Response) => {
        Model.findOne({ _id: req.query.id })
            .then(respondWithResult(res))
            .catch(handleError(res));
    };

const removeOne =
    (Model: mongoose.Model<Document>) => (req: Request, res: Response) =>
        Model.findByIdAndDelete(req.query.id)
            .then(responseId(req, res))
            .catch(handleError(res));

const create =
    (Model: mongoose.Model<Document>) => (req: Request, res: Response) =>
        Model.create(req.body)
            .then(respondWithResult(res))
            .catch(handleError(res));

const update =
    (Model: mongoose.Model<Document>) => (req: Request, res: Response) =>
        Model.findOneAndUpdate(
            {
                _id: req.body._id // eslint-disable-line no-underscore-dangle
            },
            req.body,
            {
                new: true,
                useFindAndModify: false
            }
        )
            .then(respondWithResult(res))
            .catch(handleError(res));

export {
    list,
    find,
    update,
    create,
    removeOne,
    respondWithResult,
    handleError
};
