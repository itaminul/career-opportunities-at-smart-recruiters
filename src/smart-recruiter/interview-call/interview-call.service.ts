import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SelectedResume } from "src/entity/selectedresume";
import { In, Repository } from "typeorm";
import { InterviewerCallDto } from "./dto/interview-call.dto";
import { InterviewCallUpdateData } from "./interview-call.types";

@Injectable()
export class InterviewCallService {
  constructor(
    @InjectRepository(SelectedResume)
    public readonly selectedResumeRepository: Repository<SelectedResume>
  ) {}

  async update(interviewData: InterviewerCallDto) {
    const { ids, ...rest } = interviewData;

    if (!ids || ids.length === 0) {
      return { affected: 0 };
    }

    const updateData: InterviewCallUpdateData = {
      ...rest,
      interviewScheduledDate: new Date(rest.interviewScheduledDate),
      interviewStage: interviewData.interviewStage,
      Interviewer: interviewData.Interviewer,
      interviewScheduledTime: interviewData.interviewScheduledTime,
      interviewAddress: interviewData.interviewAddress,
    };

    try {
      const result = await this.selectedResumeRepository.update(
        { id: In(ids) },
        updateData
      );

      return { affected: result.affected };
    } catch (error) {
      throw new Error(`Failed to update interview calls: ${error.message}`);
    }
  }
}
