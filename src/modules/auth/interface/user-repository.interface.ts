import { IUser } from "./user-model.interface.js";

export interface IUserRepository {
    findByUsername(username: string): Promise<IUser | null>;
    createUser(user: IUser): Promise<IUser>;
}
