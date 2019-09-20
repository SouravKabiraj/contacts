import {UserService} from "./user.service";
import {Request, Response} from "express";
import {controller, httpGet, httpPost, request, requestParam, response} from "inversify-express-utils";
import {User} from "./user.model";
import {HttpStatusCode} from "../models/httpStatus.model";
import {Id} from "../models/id.model";
import {inject} from "inversify";

@controller('/user')
export class UserController {
    constructor(@inject('UserService') private userService: UserService) {
    }

    @httpPost('')
    public async create(@request() request: Request, @response() response: Response): Promise<void> {
        const user: User = request.body;
        await this.userService.create(user);
        response.status(HttpStatusCode.Created).send();
    }

    @httpGet('/:id')
    public async getById(@requestParam('id') id: string, @response() response: Response): Promise<void> {
        const user = await this.userService.getById(new Id(id));
        response.status(HttpStatusCode.Ok).send(user);
    }
}

