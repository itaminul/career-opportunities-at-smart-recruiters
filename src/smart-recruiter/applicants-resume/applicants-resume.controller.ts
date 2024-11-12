import { Body, Controller, Post } from "@nestjs/common";
import { ApplicantsResumeService } from "./applicants-resume.service";
import { CreateResumeDto } from "./dto/create-resume.dto";
import { Resume } from "@src/entity/resume";

@Controller("applicants-resume")
export class ApplicantsResumeController {
  constructor(public readonly resumesService: ApplicantsResumeService) {}
  @Post()
  async create(@Body() createResumeDto: CreateResumeDto): Promise<Resume> {
    return this.resumesService.create(createResumeDto);
  }
}
