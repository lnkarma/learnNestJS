import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements Omit<User, 'password'> {
  id: string;
  email: string;
  isEmailVerified: boolean;
  name: string | null;
  @Exclude()
  password?: string | null;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
