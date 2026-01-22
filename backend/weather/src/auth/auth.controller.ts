/** V8 ignore is necessary to prevent ghosting branches on coverage reports */
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FavoriteCityDto } from './dto/favorite-city.dto';

const ONE_HOUR_MS = 60 * 60 * 1000;

@Controller('/auth')
export class AuthController {
  constructor(
    /* v8 ignore next */
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  public async register(
    /* v8 ignore next */
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  public async getMe(@Req() req: any) {
    return this.authService.getUserWithFavoriteCity(req.user.sub);
  }

  @Post('/login')
  public async login(
    /* v8 ignore next */
    @Body() authDTO: CreateUserDto,
    @Res({ passthrough: true }) response: any,
  ) {
    const user = await this.authService.validateUser(
      authDTO.username,
      authDTO.password,
    );
    const loginData = await this.authService.login(user);

    response.cookie('jwt', loginData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ONE_HOUR_MS,
    });

    return {
      message: 'Login successful',
      access_token: loginData.access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  public async logout(@Res({ passthrough: true }) response: any) {
    response.clearCookie('jwt');
    return { message: 'Logout successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/favorite-city')
  public async saveFavoriteCity(
    @Req() req: any,
    /* v8 ignore next */
    @Body() favoriteCityDto: FavoriteCityDto,
  ) {
    return this.authService.saveFavoriteCity(req.user.sub, favoriteCityDto);
  }
}
