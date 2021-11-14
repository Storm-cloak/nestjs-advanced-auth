import { IsEmail, IsNotEmpty } from 'class-validator';
export class UserRegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
