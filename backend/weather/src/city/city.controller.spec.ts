import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CityFetchDto } from './dto/city-fetch.dto';
import { plainToInstance } from 'class-transformer';
import { City } from './schemas/city.schema';

describe('CityController', () => {
  let controller: CityController;
  let service: CityService;
  const mockCityService = {
    fetchCityData: jest.fn(),
  };

  let dto: CityFetchDto;
  let cityDto: City;

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

    const plainObject = {
      name: 'Sample City',
      state: 'Sample State',
      country: 'Sample Country',
      lang: 'en',
    };
    dto = plainToInstance(CityFetchDto, plainObject);
  });

  describe('creating', () => {
    it('should create TestingCityController', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('fetchCityData', () => {
    it('should call cityService.fetchCityData and return a City object', async () => {
      const mockResult = { name: 'Sample City', temperature: 25 };
      mockCityService.fetchCityData.mockResolvedValue(mockResult);

      const result = await controller.fetchCityData(dto);

      expect(service.fetchCityData).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResult);
    });

    it('should return null when cityService returns null', async () => {
      mockCityService.fetchCityData.mockResolvedValue(null);

      const result = await controller.fetchCityData(dto);

      expect(result).toBeNull();
    });
  });
});
