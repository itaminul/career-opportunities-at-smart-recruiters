import { Module } from '@nestjs/common';
import { SelectedResumeController } from './selected-resume.controller';
import { SelectedResumeService } from './selected-resume.service';

@Module({
  controllers: [SelectedResumeController],
  providers: [SelectedResumeService]
})
export class SelectedResumeModule {}
