import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { UserRepository } from './users.reprository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
