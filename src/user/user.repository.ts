import {BaseRepository} from "../base/base.repository";
import {User, UserModel} from "./user.model";
import {Id} from "../models/id.model";
import {MongoUtility} from "../utilities/mongo.utility";
import {injectable} from "inversify";
import {LoggerUtility} from "../utilities/logger.utility";

@injectable()
export class UserRepository extends BaseRepository {
    public async save(user: User): Promise<void> {
        user._id = new Id();
        await UserModel.create(user);
        LoggerUtility.logInfo(`Saved new user with [${user._id}].`);
    }

    public async getById(id: Id): Promise<User> {
        const userDocument = await UserModel.findById(id);
        return MongoUtility.getLeanDocument<User>(userDocument);
    }
}

