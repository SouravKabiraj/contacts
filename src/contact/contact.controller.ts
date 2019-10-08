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
import {inject} from "inversify";

@controller('/contact')
export class ContactController {
    constructor(@inject("ContactService") private contactService: ContactService) {
    }

    @httpGet('/health-check')
    public healthCheck(@request() request: Request, @response() response: Response): void {
        response.status(HttpStatusCode.Ok).send({health: 'ok'});
    }

    @httpPost("/")
    public async create(@request() request: Request, @response() response: Response): Promise<void> {
        const contact: Contact = request.body;
        await this.contactService.create(contact);
        response.status(HttpStatusCode.Ok).send();
    }

    @httpPut("/:id")
    public async update(@requestParam('id') id: string, @request() request: Request, @response() response: Response) {
        const contact: Contact = request.body;
        if (Id.isEqual(id, contact._id)) {
            await this.contactService.update(contact);
            response.status(HttpStatusCode.Ok).send();
        } else {
            response.status(HttpStatusCode.BadRequest).send();
        }
    }

    @httpGet("/:id")
    public async getById(@requestParam('id') id: string, @response() response: Response) {
        const contact = await this.contactService.getById(new Id(id));
        response.status(HttpStatusCode.Ok).send(contact);
    }

    @httpGet('')
    async getByUserId(@queryParam('userId') userId: string, @response() response: Response, @queryParam('userId') fromIndex: number, @queryParam('userId') toIndex: number) {
        let contacts = await this.contactService.getFor(userId);
        if (fromIndex != null && toIndex != null) {
            contacts = contacts.slice(fromIndex, ++toIndex);
        }
        response.status(HttpStatusCode.Ok).send(contacts);
    }
}

