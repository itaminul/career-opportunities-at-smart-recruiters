import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { QueryFailedError } from 'typeorm';
  import { Request, Response } from 'express';
  import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      let code = 'INTERNAL_SERVER_ERROR';
      let details: any = null;
  
      // Handle HTTP exceptions
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const response = exception.getResponse();
        const responseBody = exception.getResponse();
        message =
          typeof responseBody === 'object'
            ? (responseBody as any).message || exception.message
            : exception.message;
        code = exception.name;
        details = typeof responseBody === 'object' ? responseBody : { error: responseBody };
      }
      // Handle TypeORM EntityNotFoundError
      else if (exception instanceof EntityNotFoundError) {
        status = HttpStatus.NOT_FOUND;
        message = 'The requested resource was not found';
        code = 'ENTITY_NOT_FOUND';
        details = { entity: exception.message };
      }
      // Handle TypeORM QueryFailedError (database errors)
      else if (exception instanceof QueryFailedError) {
        status = HttpStatus.BAD_REQUEST;
        message = 'Database operation failed';
        code = 'DATABASE_ERROR';
  
        // Handle specific PostgreSQL error codes
        const pgError = exception as any;
        if (pgError.code) {
          switch (pgError.code) {
            case '23505': // Unique violation
              message = 'Duplicate entry - unique constraint violation';
              code = 'DUPLICATE_ENTRY';
              details = {
                constraint: pgError.constraint,
                table: pgError.table,
              };
              break;
            case '23503': // Foreign key violation
              message = 'Foreign key constraint violation';
              code = 'FOREIGN_KEY_VIOLATION';
              details = {
                constraint: pgError.constraint,
                table: pgError.table,
              };
              break;
            case '23502': // Not null violation
              message = 'Not null constraint violation';
              code = 'NOT_NULL_VIOLATION';
              details = {
                column: pgError.column,
                table: pgError.table,
              };
              break;
            default:
              details = {
                code: pgError.code,
                message: pgError.message,
              };
          }
        }
      }
      // Handle other unexpected errors
      else if (exception instanceof Error) {
        message = exception.message;
        code = exception.name;
      }
  
      // Log the error (in production, you'd use a proper logger)
      console.error({
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        error: exception,
      });
      if (!response.headersSent) {
        response.status(status).json({
          statusCode: status,
          message,
          code,
          timestamp: new Date().toISOString(),
          path: request.url,
          details,
        });
      }
    }
  }
  