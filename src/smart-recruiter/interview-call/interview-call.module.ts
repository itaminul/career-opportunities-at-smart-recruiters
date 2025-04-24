import { Module } from '@nestjs/common';
import { InterviewCallService } from './interview-call.service';
import { InterviewCallController } from './interview-call.controller';

@Module({
  providers: [InterviewCallService],
  controllers: [InterviewCallController]
})
export class InterviewCallModule {}
