import {Contact} from "./contact.model";
import {injectable} from "inversify";

@injectable()
export class ContactService {
    public async create(contact: Contact): Promise<void> {
        return undefined;
    }
}
