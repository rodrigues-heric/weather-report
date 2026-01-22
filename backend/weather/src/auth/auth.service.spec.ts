/** V8 ignore is necessary to prevent ghosting branches on coverage reports */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as amqp from 'amqplib';
import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { FavoriteCityDto } from './dto/favorite-city.dto';

jest.mock('bcrypt');
jest.mock('amqplib');

describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register()', () => {
    it('should throw BadRequestException if user already exists', async () => {
      mockRepository.findOne.mockResolvedValue({ id: '1' });
      await expect(
        service.register({ username: 'test', password: '123' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should hash password and save user', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      mockRepository.create.mockReturnValue({ id: '1', username: 'test' });

      const result = await service.register({
        username: 'test',
        password: '123',
      });
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result.id).toBeDefined();
    });
  });

  describe('login()', () => {
    it('should return access token and user info', async () => {
      const user = { id: '1', username: 'test' };
      mockJwtService.sign.mockReturnValue('jwt-token');

      const result = await service.login(user);

      expect(jwtService.sign).toHaveBeenCalledWith({
        username: 'test',
        sub: '1',
      });
      expect(result).toEqual({
        access_token: 'jwt-token',
        user: { id: '1', username: 'test' },
      });
    });
  });

  describe('validateUser()', () => {
    it('should return user if password is correct', async () => {
      const user = { username: 'test', password: 'hashed' };
      mockRepository.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test', 'pass');
      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if password is found but invalid', async () => {
      const mockUser = {
        username: 'test',
        password: 'hashed_password',
      };
      mockRepository.findOne.mockResolvedValue(mockUser);

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateUser('test', 'wrong_password'),
      ).rejects.toThrow(UnauthorizedException);

      await expect(
        service.validateUser('test', 'wrong_password'),
      ).rejects.toThrow('User or password invalid');

      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrong_password',
        'hashed_password',
      );
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.validateUser('test', 'pass')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('saveFavoriteCity()', () => {
    const mockUser = { id: '1', username: 'test', favoriteCity: null };
    const dto = { favoriteCity: { name: 'Porto Alegre' } };

    it('should throw NotFoundException if user is not found in database', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const dto: FavoriteCityDto = { favoriteCity: { name: 'Curitiba' } };

      await expect(service.saveFavoriteCity('invalid-id', dto)).rejects.toThrow(
        new NotFoundException('User not found'),
      );

      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(amqp.connect).not.toHaveBeenCalled();
    });

    it('should set favoriteCity to null if favoriteCityDto.favoriteCity is not provided', async () => {
      const mockUser = {
        id: '1',
        username: 'test',
        favoriteCity: { name: 'Old City' },
      };
      mockRepository.findOne.mockResolvedValue(mockUser);

      const dto: any = { favoriteCity: undefined };

      const mockSave = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockUser as any);

      const result = await service.saveFavoriteCity('1', dto);

      expect(mockUser.favoriteCity).toBeNull();
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          favoriteCity: null,
        }),
      );

      expect(result.favoriteCity).toBeNull();
      expect(amqp.connect).not.toHaveBeenCalled();
    });

    it('should save city and call RabbitMQ successfully', async () => {
      mockRepository.findOne.mockResolvedValue({ ...mockUser });

      const mockChannel = {
        assertQueue: jest.fn(),
        sendToQueue: jest.fn(),
        close: jest.fn(),
      };
      const mockConnection = {
        createChannel: jest.fn().mockResolvedValue(mockChannel),
        close: jest.fn(),
      };
      (amqp.connect as jest.Mock).mockResolvedValue(mockConnection);

      const result = await service.saveFavoriteCity('1', dto);

      expect(mockRepository.save).toHaveBeenCalled();
      expect(amqp.connect).toHaveBeenCalled();
      expect(result.favoriteCity).toEqual(dto.favoriteCity);
    });

    it('should log error but NOT crash if RabbitMQ fails', async () => {
      mockRepository.findOne.mockResolvedValue({ ...mockUser });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (amqp.connect as jest.Mock).mockRejectedValue(new Error('RabbitMQ Down'));

      const result = await service.saveFavoriteCity('1', dto);

      expect(result.message).toBe('Favorite city saved successfully');
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao enviar mensagem para RabbitMQ:',
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });
  });

  describe('getUserWithFavoriteCity()', () => {
    it('should return user with favorite city', async () => {
      const user = {
        id: '1',
        username: 'test',
        favoriteCity: { name: 'Paris' },
      };
      mockRepository.findOne.mockResolvedValue(user);

      const result = await service.getUserWithFavoriteCity('1');
      expect(result).toEqual({
        id: '1',
        username: 'test',
        favoriteCity: { name: 'Paris' },
      });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.getUserWithFavoriteCity('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
