import { Controller, Get } from "@nestjs/common";
import { ApplicationScrutinyService } from "./application-scrutiny.service";

@Controller("application-scrutiny")
export class ApplicationScrutinyController {
  constructor(
    private readonly appScrutinyService: ApplicationScrutinyService
  ) {}

  @Get(':id')
  async getScrutinyApplicaton() {
    return await this.appScrutinyService.getScrutinyApplicaton();
  }
}
