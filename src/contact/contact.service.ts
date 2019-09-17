import {Contact} from "./contact.model";
import {injectable} from "inversify";
import {ContactRepository} from "./contact.repository";

@injectable()
export class ContactService {
    constructor(private contactRepository: ContactRepository) {
    }

    public async create(contact: Contact): Promise<void> {
        await this.contactRepository.save(contact);
    }

    public async update(contact: Contact): Promise<void> {
        await this.contactRepository.update(contact);
    }
}

