import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  ValidateNested,
  IsOptional,
} from 'class-validator';
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

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ForecastDto)
  forecast?: ForecastDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => HourlyDto)
  hourly?: HourlyDto[];
}

export class ForecastDto {
  @IsString()
  @IsNotEmpty()
  date: string;

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
}

export class HourlyDto {
  @IsString()
  @IsNotEmpty()
  time: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  temperature: number;
}
