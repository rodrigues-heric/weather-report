import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './schemas/city.schema';
import { Model } from 'mongoose';
import { CityDto } from './dto/city.dto';

export interface cityFetchPayload {
  name: string;
  country: string;
  state: string;
}

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private cityModel: Model<City>) {}

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
      .sort({ createdAt: -1 })
      .exec();

    return latestEntry;
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
