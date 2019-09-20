import {UserService} from "./user.service";
import {Request, Response} from "express";
import {request, response} from "inversify-express-utils";
import {User} from "./user.model";
import {HttpStatusCode} from "../models/httpStatus.model";
import {Id} from "../models/id.model";

export class UserController {
    constructor(private userService: UserService) {
    }

    public async create(@request() request: Request, @response() response: Response): Promise<void> {
        const user: User = request.body;
        await this.userService.create(user);
        response.status(HttpStatusCode.Created).send();
    }

    public async getById(id: string, @response() response: Response): Promise<void> {
        const user = await this.userService.getById(new Id(id));
        response.status(HttpStatusCode.Ok).send(user);
    }
}

