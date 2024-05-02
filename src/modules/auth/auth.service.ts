import { JWTClaims } from "./interface/jwt.interface.js";
import jwt from 'jsonwebtoken'

export class AuthService {
    public signJWT(claims: JWTClaims) {
        return jwt.sign(claims, process.env.JWT_SECRET_KEY!, {
            expiresIn: '24h'
        });
    }

    public decodeJWT(token: string) {
        return new Promise((resolve) => {
            jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decoded) => {
                if (err) return resolve(null);
                return resolve(decoded);
            });
        })
    }
}
