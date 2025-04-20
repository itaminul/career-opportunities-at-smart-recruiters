import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApplicationScrutinyService } from "./application-scrutiny.service";
import { ScrutinyFiltersDto } from "./dto/scrutiny-filters.dto";

@Controller("application-scrutiny")
export class ApplicationScrutinyController {
  constructor(
    private readonly appScrutinyService: ApplicationScrutinyService
  ) {}

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
