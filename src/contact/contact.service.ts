import {Contact} from "./contact.model";
import {inject, injectable} from "inversify";
import {ContactRepository} from "./contact.repository";
import {Id} from "../models/id.model";

@injectable()
export class ContactService {
    constructor(@inject("ContactRepository") private contactRepository: ContactRepository) {
    }

    public async create(contact: Contact): Promise<void> {
        await this.contactRepository.save(contact);
    }

    public async update(contact: Contact): Promise<void> {
        await this.contactRepository.update(contact);
    }

    public async getById(id: Id): Promise<Contact> {
        return await this.contactRepository.getById(id);
    }

    public async getFor(userId: Id): Promise<Contact[]> {
        return await this.contactRepository.getByUserId(userId);
    }
}

