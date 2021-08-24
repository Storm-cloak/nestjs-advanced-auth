import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config/db.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailsModule } from './mailer/mails.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfig } from './config/mailer.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from './common/logger/logger.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { LoggingInterceptor } from './common/logger/logger.interceptor';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MailerConfig,
    }),
    LoggerModule,
    UsersModule,
    AuthModule,
    MailsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
