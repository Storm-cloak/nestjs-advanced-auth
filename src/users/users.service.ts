import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './users.reprository';
import { UserRegisterDto } from './dto/user-register.dto';
import { MailsService } from '../mailer/mails.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private mailsService: MailsService,
    private configService: ConfigService,
  ) {}
  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

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
}
