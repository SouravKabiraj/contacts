import {Contact} from "./contact.model";
import {controller, httpPost} from "inversify-express-utils";
import {ContactService} from "./contact.service";

@controller('/contact')
export class ContactController {
    constructor(private contactService: ContactService) {
    }

    @httpPost("/")
    public async create(contact: Contact): Promise<void> {
        await this.contactService.create(contact);
    }
}

