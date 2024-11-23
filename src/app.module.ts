import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "./data-source";
import { ApplicantsResumeModule } from "./smart-recruiter/applicants-resume/applicants-resume.module";
@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource), ApplicantsResumeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
