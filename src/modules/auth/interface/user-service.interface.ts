import { ILoginDTO, IRegisterDTO } from './user-dto.interface.js';

import { IUser } from './user-model.interface.js';

export interface IUserService {
    registerUser(registerDto: IRegisterDTO): Promise<IUser>;
    loginUser(loginDto: ILoginDTO): Promise<{ token: string }>;
}
