import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomLoggerService) {}
  use(req: Request, res: Response, next: NextFunction): any {
    const timeRequest = new Date().getTime();
    res.on('close', () => {
      const timeResponse = new Date().getTime();
      const delay = timeResponse - timeRequest;
      this.logger.log(res.statusMessage, undefined, {
        timeResponse,
        delay,
        userID: undefined,
        request: {
          method: req.method,
          body: req.body,
        },
        response: {
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.getHeaders(),
        },
      });
    });
    next();
  }
}
