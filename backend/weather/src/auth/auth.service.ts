import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FavoriteCityDto } from './dto/favorite-city.dto';
import * as amqp from 'amqplib';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{
    id: string;
    username: string;
    message: string;
  }> {
    const { username, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return {
      id: user.id,
      username: user.username,
      message: 'User registered successfully',
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('User or password invalid');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('User or password invalid');
    }

    return user;
  }

  async login(
    user: any,
  ): Promise<{ access_token: string; user: { id: string; username: string } }> {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async saveFavoriteCity(
    userId: string,
    favoriteCityDto: FavoriteCityDto,
  ): Promise<{ message: string; favoriteCity: Record<string, any> | null }> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.favoriteCity = favoriteCityDto.favoriteCity || null;
    await this.usersRepository.save(user);
    this.sendCityToQueue(user, userId);

    return {
      message: 'Favorite city saved successfully',
      favoriteCity: user.favoriteCity,
    };
  }

  private async sendCityToQueue(user: User, userId: string) {
    if (!user.favoriteCity) return;

    try {
      const connection = await amqp.connect(
        'amqp://guest:guest@localhost:5672',
      );
      const channel = await connection.createChannel();
      await channel.assertQueue('favorite_cities', { durable: false });
      const message = JSON.stringify({
        city_name: user.favoriteCity.name,
        user_id: userId,
      });
      channel.sendToQueue('favorite_cities', Buffer.from(message));
      console.log('Mensagem enviada para RabbitMQ:', message);
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Erro ao enviar mensagem para RabbitMQ:', error);
    }
  }

  async getUserWithFavoriteCity(userId: string): Promise<{
    id: string;
    username: string;
    favoriteCity: Record<string, any> | null;
  }> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      favoriteCity: user.favoriteCity,
    };
  }
}
