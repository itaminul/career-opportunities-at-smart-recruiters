import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApplicationScrutinyService } from "./application-scrutiny.service";
import { ScrutinyFiltersDto } from "./dto/scrutiny-filters.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller("application-scrutiny")
export class ApplicationScrutinyController {
  constructor(
    private readonly appScrutinyService: ApplicationScrutinyService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  async getScrutinyApplicaton(@Body() filters: ScrutinyFiltersDto) {
    try {
      const results =
        await this.appScrutinyService.getScrutinyApplication(filters);
      return results;
    } catch (error) {
      throw error;
    }
  }
}
