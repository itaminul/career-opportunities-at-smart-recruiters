import { Module } from "@nestjs/common";
import { ApplicantsResumeService } from "./applicants-resume.service";
import { ApplicantsResumeController } from "./applicants-resume.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Resume } from "@src/entity/resume";
import { Resume_attachments } from "@src/entity/resume_attachments";

@Module({
  imports: [TypeOrmModule.forFeature([Resume, Resume_attachments])],
  providers: [ApplicantsResumeService],
  controllers: [ApplicantsResumeController],
})
export class ApplicantsResumeModule {}
