import { RoleType } from '../modules/auth/role-type.js';
import jwt from 'jsonwebtoken';

export const generateToken = (user: { id: string; username: string; role: RoleType }, secretKey: string): string => {
    return jwt.sign({ userId: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '24h' });
};

export const verifyToken = (token: string, secretKey: string) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error: any) {
        return null;
    }
};