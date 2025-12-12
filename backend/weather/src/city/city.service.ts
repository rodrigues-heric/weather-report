import { Injectable } from '@nestjs/common';

@Injectable()
export class CityService {
  getCityInfo(): string {
    return 'City information';
  }
}
