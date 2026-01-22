import { validate } from 'class-validator';
import { CityFetchDto } from './city-fetch.dto';

describe('CityFetchDto', () => {
  let dto: CityFetchDto;

  beforeEach(() => {
    dto = new CityFetchDto();
  });

  it('should pass if all fields are valid', async () => {
    dto.name = 'New York';
    dto.country = 'USA';
    dto.state = 'NY';
    dto.lang = 'en';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('name validation', () => {
    it('should fail if name is not a string', async () => {
      (dto as any).name = 123;
      dto.country = 'USA';
      dto.state = 'NY';
      dto.lang = 'en';

      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if name is empty', async () => {
      dto.name = '';
      dto.country = 'USA';
      dto.state = 'NY';
      dto.lang = 'en';

      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('country validation', () => {
    it('should fail if country is not a string', async () => {
      dto.name = 'New York';
      (dto as any).country = 123;
      dto.state = 'NY';
      dto.lang = 'en';

      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if country is empty', async () => {
      dto.name = 'New York';
      dto.country = '';
      dto.state = 'NY';
      dto.lang = 'en';

      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('state validation', () => {
    it('should fail if state is not a string', async () => {
      dto.name = 'New York';
      dto.country = 'USA';
      (dto as any).state = 123;
      dto.lang = 'en';

      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if state is empty', async () => {
      dto.name = 'New York';
      dto.country = 'USA';
      dto.state = '';
      dto.lang = 'en';

      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('lang validation', () => {
    it('should fail if lang is not a string', async () => {
      dto.name = 'New York';
      dto.country = 'USA';
      dto.state = 'NY';
      (dto as any).lang = 123;

      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail if lang is empty', async () => {
      dto.name = 'New York';
      dto.country = 'USA';
      dto.state = 'NY';
      dto.lang = '';

      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
