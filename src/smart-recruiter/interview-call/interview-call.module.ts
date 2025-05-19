import { Module } from "@nestjs/common";
import { InterviewCallService } from "./interview-call.service";
import { InterviewCallController } from "./interview-call.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SelectedResume } from "src/entity/selectedresume";

@Module({
  imports: [TypeOrmModule.forFeature([SelectedResume])],
  providers: [InterviewCallService],
  controllers: [InterviewCallController],
})
export class InterviewCallModule {}
