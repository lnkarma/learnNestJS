import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

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
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
    };

    it('should create a user', async () => {
      const user: User = {
        id: '123',
        name: null,
        ...createUserDto,
      };
      prismaClientMock.user.create.mockResolvedValueOnce(user);
      const result = await service.create(createUserDto);
      expect(prismaClientMock.user.create).toHaveBeenCalledWith({
        data: { ...createUserDto },
      });
      expect(result.email).toBe(createUserDto.email);
    });
  });

  describe('Update user', () => {
    const updateUserDto: UpdateUserDto = {
      email: 'test@example.com',
    };

    const updatedUser: User = {
      id: '123',
      name: null,
      email: 'old@example.com',
      ...updateUserDto,
    };

    it('should prisma user update method', async () => {
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
