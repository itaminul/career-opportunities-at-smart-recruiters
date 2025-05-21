import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SelectedResume } from "src/entity/selectedresume";
import { Repository } from "typeorm";

@Injectable()
export class InterviewCallReportService {
  constructor(
    @InjectRepository(SelectedResume)
    public readonly selectedResumeRepository: Repository<SelectedResume>
  ) {}

  async search(interviewStage: number) {
    try {
      const stageNumber = Number(interviewStage);
      console.log("stageNumber service", typeof stageNumber);
      if (isNaN(stageNumber)) {
        throw new Error("Invalid interview stage - must be a number");
      }

      return await this.selectedResumeRepository.find({
        where: {
          interviewStage: Number(stageNumber),
        },
      });
    } catch (error) {
      throw new Error(`Failed to search resumes: ${error.message}`);
    }
  }
}
