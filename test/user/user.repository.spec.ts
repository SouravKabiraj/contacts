import {suite, test} from "mocha-typescript";
import {User, UserModel} from "../../src/user/user.model";
import {UserRepository} from "../../src/user/user.repository";
import {expect} from 'chai';
import {MongoUtility} from "../../src/utilities/mongo.utility";
import {BaseRepositorySpec} from "../base/base.repository.spec";

@suite
class UserRepositorySpec extends BaseRepositorySpec {
    private targetObject: UserRepository;

    constructor() {
        super();
        this.targetObject = new UserRepository()
    }

    @test
    private async shouldCreateNewUser(): Promise<void> {
        const userCount = await UserModel.countDocuments();

        await this.targetObject.save(new User('sdj@pop.op', 'oppo', '+91 4254367875'));

        const finalUserCount = await UserModel.countDocuments();
        expect(finalUserCount).to.be.equals(userCount + 1);
    }

    @test
    public async shouldGetUserById(): Promise<void> {
        const user = new User('sourav@finzy.com', 'sourav', '+91 92482849');
        const id = user._id;
        await UserModel.create(user);

        const fetchedUser = await this.targetObject.getById(id);

        const document = await UserModel.findById(id);
        const leanDocument = MongoUtility.getLeanDocument<User>(document);
        expect(fetchedUser).to.deep.equals(leanDocument);
    }
}
