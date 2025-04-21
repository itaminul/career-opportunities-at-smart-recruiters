import { Module } from "@nestjs/common";
import { SelectedResumeController } from "./selected-resume.controller";
import { SelectedResumeService } from "./selected-resume.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SelectedResume } from "src/entity/selectedresume";

@Module({
  imports: [TypeOrmModule.forFeature([SelectedResume])],
  controllers: [SelectedResumeController],
  providers: [SelectedResumeService],
})
export class SelectedResumeModule {}
