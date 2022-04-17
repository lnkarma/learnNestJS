import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { createUserDto, user } from './mocks/create-user.mock';
import { updatedUser, updateUserDto } from './mocks/update-user.mock';

const prismaClientMock = mockDeep<PrismaClient>();

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useClass(
        class {
          constructor() {
            return prismaClientMock;
          }
        },
      )
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create user', () => {
    it('should call prisma user create method', async () => {
      prismaClientMock.user.create.mockResolvedValueOnce(user);
      await service.create(createUserDto);
      expect(prismaClientMock.user.create).toHaveBeenCalledWith({
        data: { ...createUserDto },
      });
    });

    it('should return a user', async () => {
      prismaClientMock.user.create.mockResolvedValueOnce(user);
      const result = await service.create(createUserDto);
      expect(result).toHaveProperty('user', user);
    });

    it('should return a token', async () => {
      prismaClientMock.user.create.mockResolvedValueOnce(user);
      const result = await service.create(createUserDto);
      expect(result).toHaveProperty('token');
    });
  });

  describe('Update user', () => {
    it('should call prisma user update method', async () => {
      prismaClientMock.user.update.mockResolvedValueOnce(updatedUser);
      await service.update('123', updateUserDto);
      expect(prismaClientMock.user.update).toHaveBeenCalled();
    });

    it('should return the updated user', async () => {
      prismaClientMock.user.update.mockResolvedValueOnce(updatedUser);
      const result = await service.update('123', updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });
});
