import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  let dto: CreateUserDto;

  beforeEach(() => {
    dto = new CreateUserDto();
  });

  it('should pass if all fields are valid', async () => {
    dto.username = 'john_doe';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('username validation', () => {
    beforeEach(() => {
      dto = new CreateUserDto();
    });

    it('should fail if username is too short | Min length := 3', async () => {
      dto.username = 'jo';
      dto.password = 'password123';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('username');
    });

    it('should fail if username is not a string', async () => {
      (dto as any).username = 123;
      dto.password = 'password123';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('password validation', () => {
    it('should fail if password is too short | Min length := 6', async () => {
      dto.username = 'john_doe';
      dto.password = '123';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('minLength');
    });
  });
});
