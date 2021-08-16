import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRegisterDto } from '../users/dto/user.register.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UserLoginDto } from './dto/user.login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
  async registerUser(userRegisterDto: UserRegisterDto) {
    const { username, password, email } = userRegisterDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await this.hashPassword(password, salt);
    const activationLink = uuidv4();
    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = hashPassword;
    user.activationLink = activationLink;
    user.email = email;
    try {
      //save user to db
      await user.save();
      return { email: user.email, activationLink: user.activationLink };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('user already exist');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUser(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return { username: user.username, email: user.email };
    }
    return null;
  }

  async activateUser(activationLink: string) {
    const user = await this.findOne({ activationLink });
    if (!user) {
      throw new Error('invalid activation link');
    }
    user.isActive = true;
    await user.save();
  }
}
