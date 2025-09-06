import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from "@nestjs/common";
import { InterviewCallReportService } from "./interview-call-report.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller("interview-call-report")
export class InterviewCallReportController {
  constructor(
    public readonly interviewCallReportService: InterviewCallReportService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get(":id")
  async getByStage(@Param("id") id: number) {
    try {
      if (isNaN(id)) {
        throw new HttpException(
          {
            success: false,
            message: "Invalid stage parameter - must be a number",
          },
          HttpStatus.BAD_REQUEST
        );
      }

      const results = await this.interviewCallReportService.search(id);
      return {
        success: true,
        data: results,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || "Failed to search resumes",
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
