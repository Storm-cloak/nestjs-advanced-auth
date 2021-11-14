import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { EntityRepository, Repository } from 'typeorm';
import User from './user.entity';
import { UserLoginDto } from '../auth/dto/user-login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private static async hashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
  async registerUser(userRegisterDto: UserRegisterDto) {
    const { username, password, email } = userRegisterDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await UserRepository.hashPassword(password, salt);
    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = hashPassword;
    user.email = email;
    try {
      //save user to db
      await user.save();
      return { email: user.email };
    } catch (error) {
      // 23505 - unique constraint violation
      if (error.code === '23505') {
        throw new ConflictException('user already exist');
      }
      throw new InternalServerErrorException();
    }
  }

  async validateUser(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    throw new BadRequestException('Wrong credentials provided');
  }
}
