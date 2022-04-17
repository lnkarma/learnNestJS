import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

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
      const user = {
        id: 123,
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
});
