import { IUser } from "./interface/user-model.interface.js";
import { IUserRepository } from "./interface/user-repository.interface.js";

export class InMemoryUserRepository implements IUserRepository {
    private users: IUser[] = [];

    async findByUsername(username: string): Promise<IUser | null> {
        const foundUser = this.users.find(user => user.username === username);
        return foundUser || null;
    }

    async createUser(user: IUser): Promise<IUser> {
        this.users.push(user);
        return user;
    }
}
