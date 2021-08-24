import { LoggerService } from '@nestjs/common';
import { SPLAT } from 'triple-beam';
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
  private format(
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  myFormat = format.printf(({ message, level, timestamp, ...params }) => {
    return `_stage: ${process.env.NODE_ENV} ${timestamp}
    level: ${level}
    message: ${message}
    ${JSON.stringify(params[SPLAT][0])}
    `;
  });

  initLogger() {
    this.logger = createLogger({
      format: format.combine(
        format.json(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        this.myFormat,
      ),
      transports: [new transports.Console()],
    });
  }

  error(message: any, optionalParamsObject?: any): any {
    this.logger.error(message, optionalParamsObject);
  }
  log(message: any, optionalParamsObject?: any): any {
    this.logger.info(message, optionalParamsObject);
  }

  warn(message: any, optionalParamsObject?: any): any {
    this.logger.warn(message, optionalParamsObject);
  }
}
