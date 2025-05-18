import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { InterviewCallService } from "./interview-call.service";
import { InterviewerCallDto } from "./dto/interview-call.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller("interview-call")
export class InterviewCallController {
  constructor(public readonly interviewCallService: InterviewCallService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Patch()
  async update(@Body() InterviewerCallDto: InterviewerCallDto) {
    try {
      const result = await this.interviewCallService.update(InterviewerCallDto);

      return {
        success: true,
        message: `Successfully updated ${result.affected} records`,
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || "Failed to update interview calls",
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
