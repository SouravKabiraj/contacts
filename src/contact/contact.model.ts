import {Name} from "../models/name.model";
import {anything} from "ts-mockito";
import {Id} from "../models/id.model";
import {prop, Typegoose} from "@hasezoey/typegoose";


export class Contact extends Typegoose {
    @prop() public _id: Id;
    @prop() private name: Name;
    @prop() private emailId: string;
    @prop() private phoneNumber: string;
    @prop() private company: string;
    @prop() public readonly userId: Id;

    constructor(name: Name, userId: Id, phoneNumber: string, emailId?: string, company?: string) {
        super();
        this._id = new Id();
        this.name = name;
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
        this.company = company;
        this.userId = userId;
    }
}

export const ContactModel = new Contact(anything(), anything(), anything(), anything(), anything()).getModelForClass(Contact);
