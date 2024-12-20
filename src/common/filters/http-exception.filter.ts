// src/common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, ForbiddenException } from '@nestjs/common';
import { Response } from 'express';

@Catch(ForbiddenException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    if (request.accepts('html')) {
      response.status(403).render('403', {
        message: 'You don\'t have permission to access this resource.',
      });
    } else {
      response.status(403).json({
        statusCode: 403,
        message: 'Forbidden resource',
        error: 'Forbidden',
      });
    }
  }
}
