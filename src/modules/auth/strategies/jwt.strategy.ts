import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/index';
import User from '../../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/modules/users/users.reprository';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfigInterface } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    configService: ConfigService<ApplicationConfigInterface>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<ApplicationConfigInterface['JWT']>('JWT').SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('user does not exist');
    }
    return user;
  }
}
