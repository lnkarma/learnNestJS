import { User } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';

export const updateUserDto: UpdateUserDto = {
  email: 'test@example.com',
};

export const updatedUser: User = {
  id: '123',
  name: null,
  email: 'old@example.com',
  ...updateUserDto,
  isEmailVerified: false,
};
