import {
  Body,
  Controller,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRegisterDto } from './dto/user-register.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async registerUser(@Body(ValidationPipe) userRegisterDto: UserRegisterDto) {
    return this.usersService.registerUser(userRegisterDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUsers() {
    return await this.usersService.findAll();
  }
}
