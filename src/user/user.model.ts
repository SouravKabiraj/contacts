import {Id} from "../models/id.model";
import {prop, Typegoose} from "@hasezoey/typegoose";

export class User extends Typegoose {
    @prop() public _id: Id;
    @prop() private mailId: string;
    @prop() private name: string;
    @prop() private phone: string;
    @prop() public password: string;

    constructor(mailId: string, name: string, phone: string) {
        super();
        this._id = new Id();
        this.mailId = mailId;
        this.name = name;
        this.phone = phone;
    }
}

export const UserModel = new User(null, null, null).getModelForClass(User);
