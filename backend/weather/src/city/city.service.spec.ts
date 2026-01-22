import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';

import { getModelToken } from '@nestjs/mongoose';

describe('CityService', () => {
  let service: CityService;
  const mockCityModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getModelToken('City'),
          useValue: mockCityModel,
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
  });

  describe('creating', () => {
    it('should create TestingCityService', () => {
      expect(service).toBeDefined();
    });
  });
});
