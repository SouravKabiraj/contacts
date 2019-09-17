import {injectable} from "inversify";
import {Contact} from "./contact.model";

@injectable()
export class ContactRepository {
    public async save(contact: Contact): Promise<void> {

    }
}
