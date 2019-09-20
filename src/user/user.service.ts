import {User} from "./user.model";
import {UserRepository} from "./user.repository";
import {Id} from "../models/id.model";
import {inject, injectable} from "inversify";

@injectable()
export class UserService {
    constructor(@inject('UserRepository') private userRepository: UserRepository) {
    }

    public async create(user: User): Promise<void> {
        await this.userRepository.save(user)
    }

    public async getById(id: Id): Promise<User> {
        return await this.userRepository.getById(id);
    }
}
