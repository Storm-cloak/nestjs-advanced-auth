import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/modules/users/users.reprository';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto, UserLoginDto } from './dto/index';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async getAuthenticatedUser(userLoginDto: UserLoginDto) {
    const user = await this.userRepository.validateUser(userLoginDto);
    return user;
  }

  async registerUser(userRegisterDto: UserRegisterDto) {
    const { email } = await this.userRepository.registerUser(userRegisterDto);
    return email;
  }
  // public getCookieWithJwtToken(
  //   userId: number,
  //   username: string,
  //   email: string,
  // ) {
  //   const payload: JwtPayload = { userId, username, email };
  //   const token = this.jwtService.sign(payload);
  //   return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //     'jwt',
  //   )}`;
  // }
}
