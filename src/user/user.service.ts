import {User} from "./user.model";
import {UserRepository} from "./user.repository";
import {Id} from "../models/id.model";

export class UserService {
    constructor(private userRepository: UserRepository) {
    }

    public async create(user: User): Promise<void> {
        await this.userRepository.save(user)
    }

    public async getById(id: Id): Promise<User> {
        return await this.userRepository.getById(id);
    }
}
