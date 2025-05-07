import { Module } from "@nestjs/common";
import { InterviewCallService } from "./interview-call.service";
import { InterviewCallController } from "./interview-call.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SelectedResume } from "src/entity/selectedresume";
import { Resume } from "src/entity/resume";

@Module({
  imports: [TypeOrmModule.forFeature([SelectedResume, Resume])],
  providers: [InterviewCallService],
  controllers: [InterviewCallController],
})
export class InterviewCallModule {}
