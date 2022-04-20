import { User } from '@prisma/client';
export declare class UserEntity implements Omit<User, 'password'> {
    id: string;
    email: string;
    isEmailVerified: boolean;
    name: string | null;
    password?: string | null;
    constructor(partial: Partial<UserEntity>);
}
