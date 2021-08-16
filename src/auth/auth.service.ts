import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserRegisterDto } from '../users/dto/user.register.dto';
import { UserLoginDto } from 'src/users/dto/user.login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.reprository';
import { JwtService } from '@nestjs/jwt';
import { MailsService } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
    private mailsService: MailsService,
    private configService: ConfigService,
  ) {}

  async registerUser(userRegisterDto: UserRegisterDto) {
    const { email, activationLink } = await this.userRepository.registerUser(
      userRegisterDto,
    );
    //send activation link to user
    await this.mailsService.sendActivationLink(
      `${this.configService.get('apiURL')}/auth/activate/${activationLink}`,
      email,
    );
  }

  async loginUser(
    userLoginDto: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    const { username, email } = await this.userRepository.validateUser(
      userLoginDto,
    );
    const payload: JwtPayload = { username, email };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async activateUser(activationLink: string) {
    return this.userRepository.activateUser(activationLink);
  }
}
