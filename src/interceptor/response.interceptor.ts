import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm'; // Import for handling SQL errors

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Check if the response is successful
        if (data && data.status) {
          return {
            status: HttpStatus.OK,
            message: data.message || 'Request successful',
            data: data.data || null,
            error: null,
            pagination: data.pagination || null,
            metadata: {
              request_time: new Date().toISOString(),
              api_version: 'v1',
            },
          };
        }
        // Handle error responses
        return this.handleError(data);
      }),
    );
  }

  // Handle different types of errors
  private handleError(error: any) {
    if (error instanceof QueryFailedError) {
      const driverError = error.driverError as any; // Accessing the underlying database error
      // Check for specific database errors (e.g., column not found, constraint violations)
      if (driverError.code === '42703') {
        // Code for undefined column (column does not exist)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Database Error: Invalid column name',
          data: null,
          error: `Column "${driverError.column}" of relation "${driverError.table}" does not exist`,
          pagination: null,
          metadata: {
            request_time: new Date().toISOString(),
            api_version: 'v1',
          },
        };
      } else if (driverError.code === '23505') {
        // Code for unique constraint violation (e.g., duplicate entry)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Database Error: Constraint violation',
          data: null,
          error: `Duplicate value in column "${driverError.constraint}"`,
          pagination: null,
          metadata: {
            request_time: new Date().toISOString(),
            api_version: 'v1',
          },
        };
      }
    }

    // General error handling
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      data: null,
      error: error?.message || 'An unexpected error occurred',
      pagination: null,
      metadata: {
        request_time: new Date().toISOString(),
        api_version: 'v1',
      },
    };
  }
}
