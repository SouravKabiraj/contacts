import {injectable} from "inversify";
import {Contact, ContactModel} from "./contact.model";
import {BaseRepository} from "../base/base.repository";
import {Id} from "../models/id.model";
import {MongoUtility} from "../utilities/mongo.utility";
import {LoggerUtility} from "../utilities/logger.utility";

@injectable()
export class ContactRepository extends BaseRepository {
    public async save(contact: Contact): Promise<void> {
        contact._id = new Id();
        await ContactModel.create(contact);
        LoggerUtility.logInfo(`Saved new contact with [${contact._id}].`);
    }

    public async update(contact: Contact): Promise<void> {
        await ContactModel.findByIdAndUpdate(contact._id, contact);
        LoggerUtility.logInfo(`Updated contact with [${contact._id}].`);
    }

    public async getById(id: Id): Promise<Contact> {
        const document = await ContactModel.findById(id);
        const contact = MongoUtility.getLeanDocument<Contact>(document);
        return contact;
    }

    public async getByUserId(userId: string): Promise<Contact[]> {
        const documents = await ContactModel.find({userId: userId});
        const contacts = [];
        documents.forEach(document => {
            contacts.push(MongoUtility.getLeanDocument<Contact>(document));
        });
        return contacts;
    }
}
