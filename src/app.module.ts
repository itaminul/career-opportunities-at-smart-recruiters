import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "./data-source";
import { ApplicantsResumeModule } from "./smart-recruiter/applicants-resume/applicants-resume.module";
import { JobCandidateModule } from './smart-recruiter/job-candidate/job-candidate.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource), ApplicantsResumeModule, JobCandidateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
