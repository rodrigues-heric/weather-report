/** V8 ignore is necessary to prevent ghosting branches on coverage reports */

import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    /* v8 ignore next */
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req) => {
        return req?.cookies?.['jwt'] ?? null;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_KEY')!,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
