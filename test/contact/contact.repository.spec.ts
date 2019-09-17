import 'reflect-metadata';
import {suite, test} from "mocha-typescript";
import {ContactRepository} from "../../src/contact/contact.repository";
import {Contact, ContactModel} from "../../src/contact/contact.model";
import {Name} from "../../src/models/name.model";
import {expect} from 'chai';

@suite
class ContactRepositorySpec {
    private targetObject: ContactRepository;

    constructor() {
        this.targetObject = new ContactRepository()
    }

    @test
    private async shouldSaveNewContact(): Promise<void> {
        const contactCount = await ContactModel.countDocuments();
        const contact = new Contact(new Name('wef', '', 'safasf'), 'asffsaf', 'asfasf');

        await this.targetObject.save(contact);

        const actualCount = await ContactModel.countDocuments();
        expect(actualCount).to.equal(contactCount + 1);
    }
}
