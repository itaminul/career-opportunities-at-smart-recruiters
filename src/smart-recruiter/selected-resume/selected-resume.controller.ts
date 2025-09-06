import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SelectedResumeService } from "./selected-resume.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller("selected-resume")
export class SelectedResumeController {
  constructor(public readonly selectedResumeService: SelectedResumeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
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
