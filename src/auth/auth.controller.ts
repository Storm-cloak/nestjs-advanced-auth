import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserLoginDto } from 'src/users/dto/user.login.dto';
import { UserRegisterDto } from 'src/users/dto/user.register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async loginUser(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
    return this.authService.loginUser(userLoginDto);
  }

  @Put('/activate/:link')
  async activateUser(@Param('link') link) {
    await this.authService.activateUser(link);
    return `<div>
              <h1>Your account has successfully activated</h1>
            </div>`;
  }
}
