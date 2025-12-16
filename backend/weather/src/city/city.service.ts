import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './schemas/city.schema';
import { Model } from 'mongoose';
import { CityDto } from './dto/city.dto';
import axios from 'axios';

export interface cityFetchPayload {
  name: string;
  country: string;
  state: string;
}

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private cityModel: Model<City>) {}

  private weatherApiUrl =
    process.env.WEATHER_API_URL || 'http://localhost:5000';

  private async fetchWeatherFromApi(
    cityName: string,
    state: string,
  ): Promise<any> {
    try {
      const url = `${this.weatherApiUrl}/api/weather/${encodeURIComponent(cityName)}?state=${encodeURIComponent(state)}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados da API de clima:', error);
      return null;
    }
  }

  private mapWeatherDataToCityDto(
    weatherData: any,
    state: string,
  ): Partial<CityDto> | null {
    if (!weatherData) return null;

    return {
      name: weatherData.name,
      country: weatherData.country,
      state: state,
      condition: weatherData.current.condition,
      temperature: weatherData.current.temperature,
      feelsLike: weatherData.current.feelsLike,
      minTemperature: weatherData.current.minTemperature,
      maxTemperature: weatherData.current.maxTemperature,
      windSpeed: weatherData.current.windSpeed,
      humidity: weatherData.current.humidity,
      pressure: weatherData.current.pressure,
      visibility: weatherData.current.visibility,
      uvIndex: weatherData.current.uvIndex,
    };
  }

  private isTodayUTC(date: Date): boolean {
    const today = new Date();
    if (!date || isNaN(date.getTime())) {
      return false;
    }

    return (
      date.getUTCDate() === today.getUTCDate() &&
      date.getUTCMonth() === today.getUTCMonth() &&
      date.getUTCFullYear() === today.getUTCFullYear()
    );
  }

  async findAll(): Promise<City[]> {
    return this.cityModel.find().exec();
  }

  async fetchCityData(
    cityFetchPayload: cityFetchPayload,
  ): Promise<City | null> {
    const { name, country, state } = cityFetchPayload;
    const filter = {
      name: name,
      country: country,
      state: state,
    };

    const latestEntry = await this.cityModel
      .findOne(filter)
      .sort({ updatedAt: -1 })
      .exec();

    if (
      latestEntry &&
      latestEntry.updatedAt &&
      this.isTodayUTC(latestEntry.updatedAt)
    ) {
      return latestEntry;
    }

    const weatherData = await this.fetchWeatherFromApi(name, state);

    if (weatherData) {
      const weatherDto = this.mapWeatherDataToCityDto(weatherData, state);
      const fullCityDto: CityDto = {
        name,
        country,
        state,
        ...weatherDto,
      } as CityDto;

      return this.createOrUpdateCity(fullCityDto);
    }

    return null;
  }

  async createOrUpdateCity(cityDTO: CityDto): Promise<City | null> {
    const filter = {
      name: cityDTO.name,
      state: cityDTO.state,
      country: cityDTO.country,
    };

    const update = {
      $set: cityDTO,
    };

    const options = {
      upsert: true,
      new: true,
      runValidators: true,
    };

    return this.cityModel.findOneAndUpdate(filter, update, options).exec();
  }
}
