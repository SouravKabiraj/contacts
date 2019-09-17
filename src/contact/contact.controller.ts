import {Contact} from "./contact.model";
import {controller, httpPost, httpPut, request, requestParam, response} from "inversify-express-utils";
import {ContactService} from "./contact.service";
import {Id} from "../models/id.model";
import {Request, Response} from 'express';
import {HttpStatusCode} from "../models/httpStatus.model";

@controller('/contact')
export class ContactController {
    constructor(private contactService: ContactService) {
    }

    @httpPost("/")
    public async create(@request() request: Request, @response() response: Response): Promise<void> {
        const contact: Contact = request.body;
        await this.contactService.create(contact);
        response.status(HttpStatusCode.Ok).send();
    }

    @httpPut("/:id")
    public async update(@requestParam('id') id: Id, @request() request: Request, @response() response: Response) {
        const contact: Contact = request.body;
        if (id.equals(contact.id)) {
            await this.contactService.update(contact);
            response.status(HttpStatusCode.Ok).send();
        } else {
            response.status(HttpStatusCode.BadRequest).send();

        }
    }
}

