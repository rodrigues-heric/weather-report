import { IsString, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  temperature: number;

  @IsString()
  @IsNotEmpty()
  condition: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  minTemperature: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  maxTemperature: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  feelsLike: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  humidity: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  pressure: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  visibility: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  windSpeed: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  uvIndex: number;
}
