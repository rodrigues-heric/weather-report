import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { JwtAuthGuard } from '../auth/auth.guard';

describe('CityController', () => {
  let controller: CityController;
  let service: CityService;
  const mockCityService = {
    fetchCityData: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useValue: mockCityService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<CityController>(CityController);
    service = module.get<CityService>(CityService);
  });

  describe('creating', () => {
    it('should create TestingCityController', () => {
      expect(controller).toBeDefined();
    });
  });
});
