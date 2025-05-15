import { Module } from "@nestjs/common";
import { ApplicantsResumeService } from "./applicants-resume.service";
import { ApplicantsResumeController } from "./applicants-resume.controller";
import { TypeOrmModule } from "@nestjs/typeorm";



import { Resume } from "src/entity/resume";
import { Resume_attachments } from "src/entity/Resume_attachements";
import { UniqueValidationService } from "src/validators/unique-fields.validator";
@Module({
  imports: [TypeOrmModule.forFeature([Resume, Resume_attachments])],
  controllers: [ApplicantsResumeController],

  providers: [ApplicantsResumeService, UniqueValidationService],
})
export class ApplicantsResumeModule {}
