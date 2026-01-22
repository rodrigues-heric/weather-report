import { CitySchema, City, Forecast, Hourly } from './city.schema';

jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    Document: class {},
  };
});

describe('CitySchema', () => {
  it('should instantiate City and cover all properties', () => {
    const city = new City();
    city.name = 'Porto Alegre';
    city.state = 'RS';
    city.country = 'Brasil';
    city.temperature = 25;
    city.condition = 'Sunny';
    city.minTemperature = 18;
    city.maxTemperature = 30;
    city.feelsLike = 26;
    city.humidity = 50;
    city.pressure = 1012;
    city.visibility = 10000;
    city.windSpeed = 10;
    city.uvIndex = 5;
    city.createdAt = new Date();
    city.updatedAt = new Date();
    city.forecast = [];
    city.hourly = [];

    expect(city.name).toBe('Porto Alegre');
  });

  it('should cover the schema factory and property definitions', () => {
    const schemaDefinition = (CitySchema as any).obj;
    expect(schemaDefinition).toBeDefined();
    expect(schemaDefinition.name.required).toBe(true);
  });

  it('should instantiate Forecast and cover all properties', () => {
    const forecast = new Forecast();
    forecast.date = '2026-01-22';
    forecast.condition = 'Cloudy';
    forecast.minTemperature = 15;
    forecast.maxTemperature = 25;

    expect(forecast.date).toBe('2026-01-22');
    expect(forecast.condition).toBe('Cloudy');
    expect(forecast.minTemperature).toBe(15);
    expect(forecast.maxTemperature).toBe(25);
  });

  it('should instantiate Hourly and cover all properties', () => {
    const hourly = new Hourly();
    hourly.time = '10:00';
    hourly.condition = 'Rainy';
    hourly.temperature = 18;

    expect(hourly.time).toBe('10:00');
    expect(hourly.condition).toBe('Rainy');
    expect(hourly.temperature).toBe(18);
  });

  it('should verify auxiliary schema factories definitions', () => {
    const { ForecastSchema, HourlySchema } = require('./city.schema');

    const forecastObj = (ForecastSchema as any).obj;
    expect(forecastObj.date.required).toBe(true);

    const hourlyObj = (HourlySchema as any).obj;
    expect(hourlyObj.time.required).toBe(true);
  });
});
