import {suite, test} from "mocha-typescript";
import {UserService} from "../../src/user/user.service";
import {User} from "../../src/user/user.model";
import {instance, mock, verify, when} from "ts-mockito";
import {UserRepository} from "../../src/user/user.repository";
import {Id} from "../../src/models/id.model";
import {expect} from 'chai';

@suite
class UserServiceSpec {
    private targetObject: UserService;
    private userRepository = mock(UserRepository);

    constructor() {
        this.targetObject = new UserService(instance(this.userRepository));
    }

    @test
    private async shouldCreateNewUser(): Promise<void> {
        const user = new User('user@id.com', 'user', '+21 83678468');

        await this.targetObject.create(user);

        verify(this.userRepository.save(user)).once();
    }

    @test
    public async shouldGetUserById(): Promise<void> {
        const id = new Id();
        const user = new User('pop', 'popo', '82378973');

        when(this.userRepository.getById(id)).thenResolve(user);

        const fetchedUser = await this.targetObject.getById(id);

        expect(fetchedUser).to.equals(user);
    }
}
