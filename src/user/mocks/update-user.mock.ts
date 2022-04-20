import { User } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export const updateUserDto: UpdateUserDto = {
  email: 'test@example.com',
};

export const updatedUser: UserEntity = {
  id: '123',
  name: null,
  email: 'old@example.com',
  ...updateUserDto,
  isEmailVerified: false,
};

export const updatedPrismaUser: User = {
  ...updatedUser,
  password: null,
};
