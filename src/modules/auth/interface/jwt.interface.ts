import { RoleType } from "../role-type.js";

export interface JWTClaims {
    userId: string;
    role: RoleType;
}; 