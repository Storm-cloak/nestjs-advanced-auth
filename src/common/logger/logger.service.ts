import { LoggerService } from '@nestjs/common';
import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from 'winston';
export class CustomLoggerService implements LoggerService {
  private logger: WinstonLogger;
  constructor() {
    this.initLogger();
  }
  private formatter(
    message: string,
    params?: Record<string, unknown>,
  ): Record<string, unknown> {
    return {
      _stage: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      message,
      ...params,
    };
  }

  initLogger() {
    this.logger = createLogger({
      format: format.combine(
        format.json(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.prettyPrint(),
      ),
      transports: [new transports.Console()],
    });
  }

  log(message: any, context?: string, params?: Record<string, unknown>): void {
    this.logger.info(this.formatter(message, params));
  }

  error(message: any, params?: Record<string, unknown>): void {
    this.logger.error(this.formatter(message, params));
  }

  warn(message: any, params?: Record<string, unknown>): void {
    this.logger.warn(this.formatter(message, params));
  }
}
