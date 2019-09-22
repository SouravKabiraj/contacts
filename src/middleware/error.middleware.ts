import {Request, Response} from "express";
import {HttpStatusCode} from "../models/httpStatus.model";
import {Error, ErrorType} from "../models/error.model";
import {LoggerUtility} from "../utilities/logger.utility";

export class ErrorMiddleware {
    public static handle(err: Error, req: Request, res: Response, next: any): void {
        LoggerUtility.logError(err.toString());
        res.status(HttpStatusCode.InternalServerError).send(new Error(ErrorType.INTERNAL_SERVER_ERROR, 'Something went wrong!!'))
    }
}
