import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserRegisterDto } from './dto/index';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './guards/local.auth.guard';
import { RequestWithUser } from './interfaces';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/login')
  async loginUser(@Req() req: RequestWithUser) {
    const user = req.user;
    user.password = undefined;
    return user;
  }

  @Post('/register')
  async registerUser(@Body(ValidationPipe) userRegisterDto: UserRegisterDto) {
    return this.authService.registerUser(userRegisterDto);
  }
}
