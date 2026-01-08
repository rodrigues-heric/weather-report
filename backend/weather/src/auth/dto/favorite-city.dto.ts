import { IsObject, IsOptional } from 'class-validator';

export class FavoriteCityDto {
  @IsOptional()
  @IsObject()
  favoriteCity?: Record<string, any> | null;
}
