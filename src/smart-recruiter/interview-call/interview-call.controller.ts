import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
} from "@nestjs/common";
import { InterviewCallService } from "./interview-call.service";
import { InterviewerCallDto } from "./dto/interview-call.dto";

@Controller("interview-call")
export class InterviewCallController {
  constructor(public readonly interviewCallService: InterviewCallService) {}

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
