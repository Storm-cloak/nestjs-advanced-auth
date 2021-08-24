import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { v4 as uuid4 } from 'uuid';
import { CustomLoggerService } from './logger.service';

@Injectable()
class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: CustomLoggerService) {
    //empty
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const traceID = uuid4();
    const start = Date.now();

    this.prepareDataAndLog('info', context, traceID, start);

    return next
      .handle()
      .pipe(
        tap((data) => {
          this.logger.log(`After... ${Date.now() - start}ms`);
          this.prepareDataAndLog('info', context, traceID, start, data);
        }),
      )
      .pipe(
        catchError((err) => {
          this.prepareDataAndLog('error', context, traceID, start, err);
          return throwError(err);
        }),
      );
  }

  prepareDataAndLog(
    level: string,
    context: any,
    traceID: string,
    start: number,
    data?: any,
  ) {
    const args = context.args['0'];
    const response = context.args['1'];
    const duration = Date.now() - start;
    this.logger.log('', {
      level,
      _stage: process.env.NODE_ENV,
      timestamp: new Date(),
      userID: undefined,
      traceID,
      statusCode: data && data.status ? data.status : response.statusCode,
      duration,
      inUrl: args.url,
      outUrl: undefined,
      request: {
        url: args.url,
        method: args.method,
        params: args.params,
        query: args.query,
        body: args.body,
      },
      response: data,
    });
  }
}

export { LoggingInterceptor };
