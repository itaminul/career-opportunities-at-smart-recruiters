import { Module } from '@nestjs/common';
import { ApplicantsResumeService } from './applicants-resume.service';
import { ApplicantsResumeController } from './applicants-resume.controller';

@Module({
  providers: [ApplicantsResumeService],
  controllers: [ApplicantsResumeController]
})
export class ApplicantsResumeModule {}
