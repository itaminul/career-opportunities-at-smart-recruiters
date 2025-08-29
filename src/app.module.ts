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
import { InterviewCallReportModule } from "./smart-recruiter/interview-call-report/interview-call-report.module";
import { AuthModule } from "./auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./auth/jwt.strategy";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource),
    ApplicantsResumeModule,
    ApplicationScrutinyModule,
    SelectedResumeModule,
    TypeOrmModule.forFeature([Resume, Resume_attachments]),
    InterviewCallModule,
    InterviewCallReportModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
  ],
  controllers: [],
  providers: [AppService, AuthModule, JwtService, JwtStrategy, JwtAuthGuard],
})
export class AppModule {}
