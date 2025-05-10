import { Module } from "@nestjs/common";
import { SelectedResumeController } from "./selected-resume.controller";
import { SelectedResumeService } from "./selected-resume.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SelectedResume } from "src/entity/selectedresume";
import { Resume } from "src/entity/resume";

@Module({
  imports: [TypeOrmModule.forFeature([SelectedResume, Resume])],
  controllers: [SelectedResumeController],
  providers: [SelectedResumeService],
})
export class SelectedResumeModule {}
