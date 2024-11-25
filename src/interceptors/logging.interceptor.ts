import { Injectable, NestInterceptor, ExecutionContext,  CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      
      const request = context.switchToHttp().getRequest();
      const { method, url, body } = request;

      console.log(`Incoming Request: ${method} ${url} ${body}`)

      const startTime = Date.now();
      return next.handle().pipe(
        tap(() => {
          const duration = Date.now() - startTime;
          console.log(`Request handled in ${duration}ms`);
        }),
      );
    }
  }
  