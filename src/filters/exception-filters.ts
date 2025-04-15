import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpStatus,
  } from "@nestjs/common";
  import { QueryFailedError } from "typeorm";
  import { Response } from "express";
  import { QueryError } from "pg"; // Import PostgreSQL error type
  @Catch(QueryFailedError)
  export class ExceptionFilters implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>(); // Access the request object to get the URL
      const timestamp = new Date().toISOString(); // Capture timestamp of the error occurrence
  
      // Accessing the PostgreSQL driver error by type-casting
      const driverError = exception.driverError as QueryError; // Type-cast to `QueryError` from `pg`
  
      let errorResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Database error occurred",
        error: exception.message || "An unexpected database error occurred",
        code: driverError?.code, // PostgreSQL error code
        detail: driverError?.detail, // Additional details from PostgreSQL
        table: this.extractTableName(driverError), // Extract table name from detail
        column: this.extractColumnName(driverError), // Extract column name from detail
        url: request.url, // Capture the URL of the request
        timestamp: timestamp, // Include the timestamp of the error
      };
  
      // Handle specific error codes such as unique constraint violation (23505)
      if (driverError?.code === "23505") {
        errorResponse = {
          ...errorResponse,
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Unique constraint violation",
          error: "A record with the same value already exists",
          //code: driverError.code,
         //detail: driverError.detail,
        };
      }
  
      // Send the error response as JSON
      response.status(errorResponse.statusCode).json(errorResponse);
    }
  
    // Helper method to extract table name from the error detail
    private extractTableName(driverError: QueryError): string {
      // PostgreSQL error detail often contains the table name for constraint violations
      if (driverError?.detail) {
        const match = driverError.detail.match(/relation "(.*?)"/);
        if (match) {
          return match[1]; // Extract the table name
        }
      }
      return "Unknown table";
    }
  
    // Helper method to extract column name from the error detail
    private extractColumnName(driverError: QueryError): string {
      // PostgreSQL error detail often contains the column name in unique violations
      if (driverError?.detail) {
        const match = driverError.detail.match(/column "(.*?)"/);
        if (match) {
          return match[1]; // Extract the column name
        }
      }
      return "Unknown column";
    }
  }
  