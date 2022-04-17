import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export const createUserDto: CreateUserDto = {
  email: 'test@example.com',
};

export const user: User = {
  id: '123',
  name: null,
  ...createUserDto,
};
