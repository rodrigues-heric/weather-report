import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CityDto } from './city.dto';

describe('CityDto', () => {
  let cityDto: CityDto;

  beforeEach(() => {
    const plainObject = {
      name: 'Sample City',
      state: 'Sample State',
      country: 'Sample Country',
      temperature: 25,
      condition: 'Sunny',
      minTemperature: 20,
      maxTemperature: 30,
      feelsLike: 27,
      humidity: 50,
      pressure: 1013,
      visibility: 10,
      windSpeed: 5,
      uvIndex: 5,
      forecast: [
        {
          date: '2023-07-01',
          condition: 'Sunny',
          minTemperature: 20,
          maxTemperature: 30,
        },
      ],
      hourly: [{ time: '10:00', temperature: 25 }],
      sunrise: '06:00',
      sunset: '18:00',
    };

    cityDto = plainToInstance(CityDto, plainObject);
  });

  describe('name validation', () => {
    it('should fail if name is not a string', async () => {
      (cityDto as any).name = 123;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if name is empty', async () => {
      cityDto.name = '';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('state validation', () => {
    it('should fail if state is not a string', async () => {
      (cityDto as any).state = 123;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if state is empty', async () => {
      cityDto.state = '';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('country validation', () => {
    it('should fail if country is not a string', async () => {
      (cityDto as any).country = 123;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if country is empty', async () => {
      cityDto.country = '';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('temperature validation', () => {
    it('should fail if temperature is not a number', async () => {
      (cityDto as any).temperature = 'hot';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if temperature is empty', async () => {
      (cityDto as any).temperature = null;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('condition validation', () => {
    it('should fail if condition is not a string', async () => {
      (cityDto as any).condition = 123;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if condition is empty', async () => {
      cityDto.condition = '';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('min temperature validation', () => {
    it('should fail if minTemperature is not a number', async () => {
      (cityDto as any).minTemperature = 'low';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if minTemperature is empty', async () => {
      (cityDto as any).minTemperature = null;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('max temperature validation', () => {
    it('should fail if maxTemperature is not a number', async () => {
      (cityDto as any).maxTemperature = 'high';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if maxTemperature is empty', async () => {
      (cityDto as any).maxTemperature = null;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('feels like validation', () => {
    it('should fail if feelsLike is not a number', async () => {
      (cityDto as any).feelsLike = 'warm';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if feelsLike is empty', async () => {
      (cityDto as any).feelsLike = null;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('humidity validation', () => {
    it('should fail if humidity is not a number', async () => {
      (cityDto as any).humidity = 'humid';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if humidity is empty', async () => {
      (cityDto as any).humidity = null;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if humidity is less than 0', async () => {
      cityDto.humidity = -10;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if humidity is greater than 100', async () => {
      cityDto.humidity = 150;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('pressure validation', () => {
    it('should fail if pressure is not a number', async () => {
      (cityDto as any).pressure = 'high';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if pressure is empty', async () => {
      (cityDto as any).pressure = null;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('visibility validation', () => {
    it('should fail if visibility is not a number', async () => {
      (cityDto as any).visibility = 'far';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if visibility is empty', async () => {
      (cityDto as any).visibility = null;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('wind speed validation', () => {
    it('should fail if windSpeed is not a number', async () => {
      (cityDto as any).windSpeed = 'breezy';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if windSpeed is empty', async () => {
      (cityDto as any).windSpeed = null;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('uv index validation', () => {
    it('should fail if uvIndex is not a number', async () => {
      (cityDto as any).uvIndex = 'high';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if uvIndex is empty', async () => {
      (cityDto as any).uvIndex = null;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('forecast validation', () => {
    it('should fail if forecast is not an array', async () => {
      (cityDto as any).forecast = 'not an array';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should pass if forecast is undefined', async () => {
      cityDto.forecast = undefined;
      const errors = await validate(cityDto);
      expect(errors.length).toBe(0);
    });
  });

  describe('hourly validation', () => {
    it('should fail if hourly is not an array', async () => {
      (cityDto as any).hourly = 'not an array';
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should pass if hourly is undefined', async () => {
      cityDto.hourly = undefined;
      const errors = await validate(cityDto);
      expect(errors.length).toBe(0);
    });
  });

  describe('sunrise validation', () => {
    it('should fail if sunrise is not a string', async () => {
      (cityDto as any).sunrise = 600;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should pass if sunrise is undefined', async () => {
      cityDto.sunrise = undefined;
      const errors = await validate(cityDto);
      expect(errors.length).toBe(0);
    });
  });

  describe('sunset validation', () => {
    it('should fail if sunset is not a string', async () => {
      (cityDto as any).sunset = 1800;
      const errors = await validate(cityDto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should pass if sunset is undefined', async () => {
      cityDto.sunset = undefined;
      const errors = await validate(cityDto);
      expect(errors.length).toBe(0);
    });
  });
});
