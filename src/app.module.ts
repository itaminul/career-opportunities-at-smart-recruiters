import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "./data-source";
import { ApplicantsResumeModule } from "./smart-recruiter/applicants-resume/applicants-resume.module";
import { ApplicationScrutinyModule } from "./smart-recruiter/application-scrutiny/application-scrutiny.module";
import { SelectedResumeModule } from "./smart-recruiter/selected-resume/selected-resume.module";
import { Resume } from "./entity/resume";
import { Resume_attachments } from "./entity/Resume_attachements";
import { InterviewCallModule } from "./smart-recruiter/interview-call/interview-call.module";
import { InterviewCallReportModule } from './smart-recruiter/interview-call-report/interview-call-report.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource),
    ApplicantsResumeModule,
    ApplicationScrutinyModule,
    SelectedResumeModule,
    TypeOrmModule.forFeature([Resume, Resume_attachments]),
    InterviewCallModule,
    InterviewCallReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
