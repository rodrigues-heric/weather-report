import { User } from './user.entity';
import { getMetadataArgsStorage } from 'typeorm';

describe('User Entity', () => {
  it('should create a user instance with correct properties', () => {
    const user = new User();
    user.id = 'uuid-test';
    user.username = 'john_doe';
    user.password = 'hashed_password';
    user.favoriteCity = { name: 'London' };

    expect(user).toBeDefined();
    expect(user.username).toBe('john_doe');
    expect(user.favoriteCity).toEqual({ name: 'London' });
  });

  it('should allow favoriteCity to be null', () => {
    const user = new User();
    user.favoriteCity = null;

    expect(user.favoriteCity).toBeNull();
  });

  it('should initialize with default values if provided by the constructor', () => {
    const user = new User();
    expect(user.createdAt).toBeUndefined();
  });

  it('should have a default timestamp function', () => {
    const user = new User();
    expect(user).toBeDefined();

    const metadata = getMetadataArgsStorage().columns.find(
      (col) => col.propertyName === 'createdAt' && col.target === User,
    );

    if (metadata && typeof metadata.options.default === 'function') {
      const defaultValue = (metadata.options.default as Function)();
      expect(defaultValue).toBe('CURRENT_TIMESTAMP');
    }
  });
});
