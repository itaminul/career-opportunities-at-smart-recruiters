import { Module } from "@nestjs/common";
import { ApplicantsResumeService } from "./applicants-resume.service";
import { ApplicantsResumeController } from "./applicants-resume.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Resume } from "src/entity/Resume";
import { Resume_attachments } from "src/entity/Resume_attachements";
@Module({
  imports: [TypeOrmModule.forFeature([Resume, Resume_attachments])],
  providers: [ApplicantsResumeService],
  controllers: [ApplicantsResumeController],
})
export class ApplicantsResumeModule {}
