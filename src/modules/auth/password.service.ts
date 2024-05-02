import bcrypt from 'bcryptjs';

export class PasswordService {
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async comparePasswords(candidatePassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }
}
