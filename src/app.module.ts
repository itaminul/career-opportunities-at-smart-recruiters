
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "./data-source";
import { ApplicantsResumeModule } from "./smart-recruiter/applicants-resume/applicants-resume.module";
import { ApplicationScrutinyModule } from './smart-recruiter/application-scrutiny/application-scrutiny.module';
import { SelectedResumeModule } from './smart-recruiter/selected-resume/selected-resume.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource), ApplicantsResumeModule, ApplicationScrutinyModule, SelectedResumeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
