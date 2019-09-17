import {Contact} from "./contact.model";
import {
    controller,
    httpGet,
    httpPost,
    httpPut,
    queryParam,
    request,
    requestParam,
    response
} from "inversify-express-utils";
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

    @httpGet("/:id")
    public async getById(id: Id, @response() response: Response) {
        const contact = await this.contactService.getById(id);
        response.status(HttpStatusCode.Ok).send(contact);
    }

    @httpGet('')
    async getByUserId(@queryParam('userId') userId: Id, response: Response, @queryParam('userId') fromIndex: number, @queryParam('userId') toIndex: number) {
        let contacts = await this.contactService.getFor(userId);
        if (fromIndex != null && toIndex != null) {
            contacts = contacts.slice(fromIndex, ++toIndex);
        }
        response.status(HttpStatusCode.Ok).send(contacts);
    }
}

