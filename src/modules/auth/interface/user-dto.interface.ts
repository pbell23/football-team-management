export interface IRegisterDTO {
    username: string;
    password: string;
}

export interface ILoginDTO {
    username: string;
    password: string;
}

export interface IUpdateUserDTO {
    username?: string;
    password?: string;
    role?: string;
}
