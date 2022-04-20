import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export const createUserDto: CreateUserDto = {
  email: 'test@example.com',
};

export const user: UserEntity = {
  id: '123',
  name: null,
  ...createUserDto,
  isEmailVerified: false,
};

export const prismaUser: User = {
  ...user,
  password: null,
};
