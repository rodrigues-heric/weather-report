import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { type cityFetchPayload, CityService } from './city.service';
import { City } from './schemas/city.schema';
import { CityDto } from './dto/city.dto';

@Controller('/city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<City[]> {
    return this.cityService.findAll();
  }

  @Post('/fetch')
  @HttpCode(HttpStatus.OK)
  async fetchCityData(
    @Body() cityFetchPayload: cityFetchPayload,
  ): Promise<City | null> {
    return this.cityService.fetchCityData(cityFetchPayload);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrUpdateCity(@Body() cityDTO: CityDto): Promise<City | null> {
    return this.cityService.createOrUpdateCity(cityDTO);
  }
}
