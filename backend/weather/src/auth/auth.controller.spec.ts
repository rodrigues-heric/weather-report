import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

const ONE_HOUR_MS = 60 * 60 * 1000;

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    getUserWithFavoriteCity: jest.fn(),
    login: jest.fn(),
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('creating', () => {
    it('should create TestingAuthController', () => {
      expect(authController).toBeDefined();
    });
  });

  describe('register()', () => {
    it('should register a user', async () => {
      const mockUser = { username: 'test', password: 'test12345' };
      const mockReq = { body: mockUser };
      const expectedResult = {
        id: 'test-123',
        username: 'test',
        message: 'User registered successfully',
      };

      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await authController.register(mockReq.body);

      expect(authService.register).toHaveBeenCalledWith(mockReq.body);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getMe()', () => {
    it('should get user', async () => {
      const mockUser = { sub: 'test-123', email: 'test@test.com' };
      const mockReq = { user: mockUser };
      const expectedResult = {
        id: 'test-123',
        username: 'test',
        favoriteCity: null,
      };

      mockAuthService.getUserWithFavoriteCity.mockResolvedValue(expectedResult);

      const result = await authController.getMe(mockReq);

      expect(authService.getUserWithFavoriteCity).toHaveBeenCalledWith(
        'test-123',
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('login()', () => {
    it('should login a user and set a cookie', async () => {
      const mockLoginDto = { username: 'test', password: 'test12345' };
      const mockLoginData = { access_token: 'test-token' };

      const mockRes = {
        cookie: jest.fn().mockReturnThis(),
      } as any;

      mockAuthService.validateUser.mockResolvedValue(mockLoginDto);
      mockAuthService.login.mockResolvedValue(mockLoginData);

      const result = await authController.login(mockLoginDto, mockRes);

      expect(authService.validateUser).toHaveBeenCalledWith(
        mockLoginDto.username,
        mockLoginDto.password,
      );
      expect(authService.login).toHaveBeenCalledWith(mockLoginDto);

      expect(mockRes.cookie).toHaveBeenCalledWith(
        'jwt',
        'test-token',
        expect.objectContaining({
          httpOnly: true,
          maxAge: ONE_HOUR_MS,
        }),
      );

      expect(result).toEqual({
        message: 'Login successful',
        access_token: 'test-token',
      });
    });
  });
});
