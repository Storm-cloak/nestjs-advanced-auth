import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { UserRepository } from 'src/modules/users/users.reprository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfigInterface } from 'src/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (
        configService: ConfigService<ApplicationConfigInterface>,
      ) => {
        const JWT_CONFIG =
          configService.get<ApplicationConfigInterface['JWT']>('JWT');
        return {
          secret: JWT_CONFIG.SECRET,
          signOptions: {
            expiresIn: JWT_CONFIG.EXPIRES_IN,
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
