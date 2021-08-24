import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { CustomLoggerService } from './logger.service';
import { LoggingInterceptor } from './logger.interceptor';

@Module({
  providers: [CustomLoggerService, LoggerMiddleware, LoggingInterceptor],
  exports: [CustomLoggerService, LoggerMiddleware, LoggingInterceptor],
})
export class LoggerModule {}
