import 'reflect-metadata';
import {suite, test} from "mocha-typescript";
import {ContactRepository} from "../../src/contact/contact.repository";
import {Contact, ContactModel} from "../../src/contact/contact.model";
import {Name} from "../../src/models/name.model";
import {expect} from 'chai';
import {BaseRepositorySpec} from "../base/base.repository.spec";
import {MongoUtility} from "../../src/utilities/mongo.utility";

@suite
class ContactRepositorySpec extends BaseRepositorySpec {
    private targetObject: ContactRepository;

    constructor() {
        super();
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

    @test
    public async shouldUpdateContact(): Promise<void> {
        const contact = new Contact(new Name('wef', '', 'safasf'), 'asffsaf', 'asfasf', '', '');
        await ContactModel.create(contact);
        const updatedContact = new Contact(new Name('uerweiouroiw', '', 'safasf'), 'asffsaf', 'asfasf', '', '');
        updatedContact.id = contact.id;

        await this.targetObject.update(updatedContact);

        const foundDocument = await ContactModel.findById(contact.id);
        const leanDocument = MongoUtility.getLeanDocument<Contact>(foundDocument);
        expect(leanDocument).to.deep.equal(updatedContact);
    }
}
