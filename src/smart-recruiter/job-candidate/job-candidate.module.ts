import { Module } from '@nestjs/common';
import { JobCandidateService } from './job-candidate.service';
import { JobCandidateController } from './job-candidate.controller';

@Module({
  providers: [JobCandidateService],
  controllers: [JobCandidateController]
})
export class JobCandidateModule {}
