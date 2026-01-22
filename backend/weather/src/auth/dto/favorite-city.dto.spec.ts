import { FavoriteCityDto } from './favorite-city.dto';
import { validate } from 'class-validator';

describe('FavoriteCityDto', () => {
  let dto: FavoriteCityDto;

  beforeEach(() => {
    dto = new FavoriteCityDto();
  });

  it('should validate successfully with a valid favoriteCity object', async () => {
    dto.favoriteCity = {
      name: 'New York',
    };

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate successfully when favoriteCity is null', async () => {
    dto.favoriteCity = null;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
