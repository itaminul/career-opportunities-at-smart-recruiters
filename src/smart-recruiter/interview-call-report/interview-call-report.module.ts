import { Module } from "@nestjs/common";
import { InterviewCallReportService } from "./interview-call-report.service";
import { InterviewCallReportController } from "./interview-call-report.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SelectedResume } from "src/entity/selectedresume";

@Module({
  imports: [TypeOrmModule.forFeature([SelectedResume])],
  providers: [InterviewCallReportService],
  controllers: [InterviewCallReportController],
})
export class InterviewCallReportModule {}
