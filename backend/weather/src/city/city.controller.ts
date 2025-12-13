import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './schemas/city.schema';
import { CityDto } from './dto/city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/all')
  async findAll(): Promise<City[]> {
    return this.cityService.findAll();
  }

  @Post()
  async createOrUpdateCity(@Body() cityDTO: CityDto): Promise<City | null> {
    return this.cityService.createOrUpdateCity(cityDTO);
  }
}
