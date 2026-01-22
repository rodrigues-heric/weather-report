import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-secret'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate()', () => {
    it('should return user data from payload', async () => {
      const payload = {
        sub: '123',
        username: 'testuser',
        email: 'test@test.com',
      };
      const result = await strategy.validate(payload);

      expect(result).toEqual({ userId: '123', username: 'testuser' });
    });
  });

  describe('jwtFromRequest (Cookie Extractor)', () => {
    it('should extract token from cookies if present', () => {
      const extractor = (strategy as any)._jwtFromRequest;

      const mockReq = {
        cookies: {
          jwt: 'fake-token',
        },
      };

      expect(extractor(mockReq)).toBe('fake-token');
    });

    it('should return null if cookies or jwt are missing', () => {
      const extractor = (strategy as any)._jwtFromRequest;

      expect(extractor({ cookies: {} })).toBeNull();
      expect(extractor(null)).toBeNull();
    });
  });
});
