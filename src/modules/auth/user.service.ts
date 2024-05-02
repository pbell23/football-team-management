import { ILoginDTO, IRegisterDTO } from './interface/user-dto.interface.js';

import { HttpError } from '../../shared/error/http-error.js';
import { IUser } from './interface/user-model.interface.js';
import { IUserRepository } from './interface/user-repository.interface.js';
import { IUserService } from './interface/user-service.interface.js';
import { PasswordService } from './password.service.js';
import { RoleType } from './role-type.js';
import { generateToken } from '../../shared/jwt-helper.js';
import { v4 as uuidv4 } from 'uuid';

export class UserService implements IUserService {
    constructor(
        private userRepository: IUserRepository,
        private passwordService: PasswordService
    ) { }

    async registerUser(registerDto: IRegisterDTO): Promise<IUser> {
        const hashedPassword = await this.passwordService.hashPassword(registerDto.password);
        const newUser: IUser = {
            id: uuidv4(),
            username: registerDto.username,
            password: hashedPassword,
            role: RoleType.User
        };
        return this.userRepository.createUser(newUser);
    }

    async loginUser(loginDto: ILoginDTO): Promise<{ token: string }> {
        const user = await this.userRepository.findByUsername(loginDto.username);
        if (!user) {
            throw new HttpError('User not found', 404);
        }

        const isMatch = await this.passwordService.comparePasswords(loginDto.password, user.password);
        if (!isMatch) {
            throw new HttpError('Invalid credentials', 401);
        }

        const token = generateToken({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET_KEY!);

        return { token };
    }
}