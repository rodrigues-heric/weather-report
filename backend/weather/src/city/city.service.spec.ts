import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CityService } from './city.service';
import { City } from './schemas/city.schema';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CityService', () => {
  let service: CityService;
  let model: any;

  const mockCityModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    exec: jest.fn(),
    sort: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getModelToken(City.name),
          useValue: mockCityModel,
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    model = module.get(getModelToken(City.name));

    jest.clearAllMocks();

    mockCityModel.findOne.mockReturnValue(mockCityModel);
    mockCityModel.find.mockReturnValue(mockCityModel);
    mockCityModel.sort.mockReturnValue(mockCityModel);
    mockCityModel.findOneAndUpdate.mockReturnValue(mockCityModel);
  });

  describe('findAll()', () => {
    it('should return all cities', async () => {
      const cities = [{ name: 'Porto Alegre' }];
      mockCityModel.exec.mockResolvedValue(cities);

      const result = await service.findAll();
      expect(result).toEqual(cities);
    });
  });

  describe('fetchCityData()', () => {
    const payload = { name: 'London', state: 'ON', country: 'UK', lang: 'en' };

    it('should return latest entry if it was updated today', async () => {
      const today = new Date();
      const mockCity = { name: 'London', updatedAt: today };

      mockCityModel.exec.mockResolvedValue(mockCity);

      const result = await service.fetchCityData(payload);

      expect(result).toEqual(mockCity);
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should fetch from API if no entry exists or it is old', async () => {
      mockCityModel.exec.mockResolvedValue(null);

      const apiData = {
        name: 'London',
        country: 'UK',
        current: { temperature: 20, condition: 'Clear' },
        forecast7days: [
          { date: '2026-01-23', minTemperature: 10, maxTemperature: 15 },
        ],
      };

      mockedAxios.get.mockResolvedValue({ data: apiData });
      mockCityModel.exec.mockResolvedValue({ ...apiData, state: 'ON' });

      const result = await service.fetchCityData(payload);

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(result?.name).toBe('London');
    });

    it('should return null if API fails', async () => {
      mockCityModel.exec.mockResolvedValue(null);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockedAxios.get.mockRejectedValue(new Error('API Down'));

      const result = await service.fetchCityData(payload);

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('isTodayUTC() branch coverage', () => {
    it('should return false if date is null or invalid', () => {
      expect((service as any).isTodayUTC(null)).toBe(false);
      expect((service as any).isTodayUTC(new Date('invalid'))).toBe(false);
    });
  });

  describe('mapWeatherDataToCityDto() branch coverage', () => {
    it('should handle missing hourly or forecast data', () => {
      const incompleteData = {
        name: 'Test',
        current: { temperature: 10 },
      };

      const result = (service as any).mapWeatherDataToCityDto(
        incompleteData,
        'State',
      );
      expect(result.forecast).toEqual([]);
      expect(result.hourly).toEqual([]);
    });

    it('should return null if weatherData is null', () => {
      expect(
        (service as any).mapWeatherDataToCityDto(null, 'State'),
      ).toBeNull();
    });

    it('should map hourly data correctly when hourlySource is provided', () => {
      const weatherData = {
        name: 'Porto Alegre',
        current: { temperature: 25 },
        hourly: [
          { time: '10:00', temperature: '22', condition: 'Sunny' },
          { time: '11:00', temperature: 23, condition: 'Cloudy' },
        ],
      };

      const result = (service as any).mapWeatherDataToCityDto(
        weatherData,
        'RS',
      );

      expect(result.hourly).toHaveLength(2);
      expect(result.hourly[0]).toEqual({
        time: '10:00',
        temperature: 22,
        condition: 'Sunny',
      });
      expect(result.hourly[1].temperature).toBe(23);
    });

    it('should try to use hourlyForecast if hourly is missing', () => {
      const weatherData = {
        name: 'Test',
        current: { temperature: 10 },
        hourlyForecast: [
          { time: '12:00', temperature: 15, condition: 'Clear' },
        ],
      };

      const result = (service as any).mapWeatherDataToCityDto(
        weatherData,
        'State',
      );

      expect(result.hourly).toHaveLength(1);
      expect(result.hourly[0].time).toBe('12:00');
    });

    it('should return an empty array if hourlySource is not an array', () => {
      const weatherData = {
        name: 'Test',
        current: { temperature: 10 },
        hourly: { notAnArray: true },
      };

      const result = (service as any).mapWeatherDataToCityDto(
        weatherData,
        'State',
      );

      expect(result.hourly).toEqual([]);
    });

    it('should return an empty array if forecast7days is not an array', () => {
      const weatherData = {
        name: 'Test',
        current: { temperature: 10 },
        forecast7days: null,
      };

      const result = (service as any).mapWeatherDataToCityDto(
        weatherData,
        'State',
      );

      expect(result.forecast).toEqual([]);
    });
  });
});
