import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserLoginDto } from 'src/users/dto/user.login.dto';
import { UserRegisterDto } from 'src/users/dto/user.register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async registerUser(@Body(ValidationPipe) userRegisterDto: UserRegisterDto) {
    return this.authService.registerUser(userRegisterDto);
  }

  @Post('/signin')
  async signUp(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
    return this.authService.loginUser(userLoginDto);
  }

  @Post('/activate:link')
  async activateUser(activationLink: string) {
    return this.authService.activateUser(activationLink);
  }
}
