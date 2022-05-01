import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

jest.mock('src/user/user.service');

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate user', () => {
    it('should be defined', () => {
      expect(service.validateUser).toBeDefined();
    });

    it('should call findOne method from user service', () => {
      service.validateUser('testUsername', 'testPassword');
      expect(userService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return null if user is not found', async () => {
      const result = await service.validateUser('badUsername', 'sample');
      expect(result).toBeNull();
    });
  });
});
