import { Module } from '@nestjs/common';
import { ApplicantResumeModule } from './smart-recruiter/applicant-resume/applicant-resume.module';
import { ApplicantsResumeModule } from './smart-recruiter/applicants-resume/applicants-resume.module';

@Module({
  imports: [ApplicantResumeModule, ApplicantsResumeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
