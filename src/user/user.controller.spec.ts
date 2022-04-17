import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create user', () => {
    const dto: CreateUserDto = {
      email: 'test@example.com',
    };
    const user = {
      id: '123',
      name: null,
      ...dto,
    };

    it('should have create method', () => {
      expect(controller.create).toBeDefined();
    });

    it('should call create service', async () => {
      userServiceCreateSpy.mockResolvedValueOnce(user);
      await controller.create(dto);
      expect(userService.create).toHaveBeenCalledWith(dto);
    });

    it('should return new user', async () => {
      userServiceCreateSpy.mockResolvedValueOnce(user);
      const result = await controller.create(dto);
      expect(result).toEqual(user);
    });
  });

  describe('edit user', () => {
    const dto: UpdateUserDto = {
      email: '',
    };
    it('should have update method', () => {
      expect(controller.update).toBeDefined();
    });

    it('should call service update method', async () => {
      await controller.update('123', dto);
      expect(userService.update).toHaveBeenCalled();
    });
  });
});
