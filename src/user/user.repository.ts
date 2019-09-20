import {BaseRepository} from "../base/base.repository";
import {User, UserModel} from "./user.model";
import {Id} from "../models/id.model";
import {MongoUtility} from "../utilities/mongo.utility";

export class UserRepository extends BaseRepository {
    public async save(user: User): Promise<void> {
        await UserModel.create(user);
    }

    public async getById(id: Id): Promise<User> {
        const userDocument = await UserModel.findById(id);
        return MongoUtility.getLeanDocument<User>(userDocument);
    }
}

