import {injectable} from "inversify";
import {Contact, ContactModel} from "./contact.model";
import {BaseRepository} from "../base/base.repository";

@injectable()
export class ContactRepository extends BaseRepository {
    public async save(contact: Contact): Promise<void> {
        await ContactModel.create(contact);
    }

    public async update(contact: Contact): Promise<void> {
        await ContactModel.updateOne({_id: contact.id}, contact);
    }
}
