import { RoleType } from "../role-type.js";

export interface IUser {
    id: string;
    username: string;
    password: string;
    role: RoleType;
}
