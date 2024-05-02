import { Request, Response } from 'express';
import { loginValidator, registerValidator } from './auth.validator.js';

import { UserService } from './user.service.js';

export class AuthController {
    constructor(private userService: UserService) { }

    async register(req: Request, res: Response): Promise<Response> {
        const { error } = registerValidator(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await this.userService.registerUser(req.body);
        return res.status(201).json({
            id: user.id,
            username: user.username,
            role: user.role
        });
    }

    async login(req: Request, res: Response): Promise<Response> {
        const { error } = loginValidator(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { token } = await this.userService.loginUser(req.body);

        return res.status(200).json({ token });
    }
}
