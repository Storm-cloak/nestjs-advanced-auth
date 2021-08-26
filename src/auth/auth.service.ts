import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserLoginDto } from 'src/users/dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.reprository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async loginUser(
    userLoginDto: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    const { username, email } = await this.userRepository.validateUser(
      userLoginDto,
    );
    const payload: JwtPayload = { username, email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async activateUser(activationLink: string) {
    return this.userRepository.activateUser(activationLink);
  }
}
