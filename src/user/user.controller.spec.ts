import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto, user } from './mocks/create-user.mock';
import { updatedUser, updateUserDto } from './mocks/update-user.mock';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const prismaClientMock = mockDeep<PrismaClient>();

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let userServiceCreateSpy;
  let userServiceUpdateSpy;

  beforeAll(() => {
    userServiceCreateSpy = jest.spyOn(UserService.prototype, 'create');
    userServiceUpdateSpy = jest.spyOn(UserService.prototype, 'update');
  });

  afterAll(() => {
    userServiceCreateSpy.mockRestore();
    userServiceUpdateSpy.mockRestore();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [UserController],
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

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create user', () => {
    it('should have create method', () => {
      expect(controller.create).toBeDefined();
    });

    it('should call create service', async () => {
      userServiceCreateSpy.mockResolvedValueOnce(user);
      await controller.create(createUserDto);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should return new user', async () => {
      userServiceCreateSpy.mockResolvedValueOnce(user);
      const result = await controller.create(createUserDto);
      expect(result).toEqual(user);
    });
  });

  describe('edit user', () => {
    it('should have update method', () => {
      expect(controller.update).toBeDefined();
    });

    it('should call service update method', async () => {
      userServiceUpdateSpy.mockResolvedValueOnce(updatedUser);
      await controller.update('123', updateUserDto);
      expect(userService.update).toHaveBeenCalled();
    });

    it('should retrun the result from user service update method', async () => {
      userServiceUpdateSpy.mockResolvedValueOnce(updatedUser);
      const result = await controller.update('123', updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });
});
