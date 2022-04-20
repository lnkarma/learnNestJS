import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { createUserDto, prismaUser } from './mocks/create-user.mock';
import { updatedPrismaUser, updateUserDto } from './mocks/update-user.mock';

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
      prismaClientMock.user.create.mockResolvedValueOnce(prismaUser);
      await service.create(createUserDto);
      expect(prismaClientMock.user.create).toHaveBeenCalledWith({
        data: { ...createUserDto },
      });
    });

    it('should return a user', async () => {
      prismaClientMock.user.create.mockResolvedValueOnce(prismaUser);
      const result = await service.create(createUserDto);
      expect(result).toHaveProperty('user', prismaUser);
    });

    it('should return a token', async () => {
      prismaClientMock.user.create.mockResolvedValueOnce(prismaUser);
      const result = await service.create(createUserDto);
      expect(result).toHaveProperty('token');
    });

    // it('should hash password if it is provided', async () => {
    //   const result = await service.create(createUserDto);
    // })
  });

  describe('Update user', () => {
    it('should call prisma user update method', async () => {
      prismaClientMock.user.update.mockResolvedValueOnce(updatedPrismaUser);
      await service.update('123', updateUserDto);
      expect(prismaClientMock.user.update).toHaveBeenCalled();
    });

    it('should return the updated user', async () => {
      prismaClientMock.user.update.mockResolvedValueOnce(updatedPrismaUser);
      const result = await service.update('123', updateUserDto);
      expect(result).toEqual(updatedPrismaUser);
    });
  });
});
