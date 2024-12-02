import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "./data-source";
import { ApplicantsResumeModule } from "./smart-recruiter/applicants-resume/applicants-resume.module";

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource), ApplicantsResumeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
