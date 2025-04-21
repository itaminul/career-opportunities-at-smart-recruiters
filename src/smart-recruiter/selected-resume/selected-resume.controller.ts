import { Body, Controller, Post } from "@nestjs/common";
import { SelectedResumeService } from "./selected-resume.service";

@Controller("selected-resume")
export class SelectedResumeController {
  constructor(public readonly selectedResumeService: SelectedResumeService) {}

  @Post()
  async create(@Body() selectedResumeDto: any) {
    try {
      const { id } = selectedResumeDto;
      const results = await this.selectedResumeService.create(id);
      return results;
    } catch (error) {
      throw error;
    }
  }
}
