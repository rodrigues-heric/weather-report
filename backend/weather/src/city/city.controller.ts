import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './schemas/city.schema';
import { CityFetchDto } from './dto/city-fetch.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('/city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/fetch')
  @HttpCode(HttpStatus.OK)
  async fetchCityData(
    @Body() cityFetchPayload: CityFetchDto,
  ): Promise<City | null> {
    return this.cityService.fetchCityData(cityFetchPayload);
  }
}
