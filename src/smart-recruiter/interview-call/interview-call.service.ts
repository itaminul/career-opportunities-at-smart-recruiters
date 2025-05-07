import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SelectedResume } from "src/entity/selectedresume";
import { In, Repository } from "typeorm";
import { InterviewerCallDto } from "./dto/interview-call.dto";
import { InterviewCallUpdateData } from "./interview-call.types";
import { Resume } from "src/entity/resume";

@Injectable()
export class InterviewCallService {
  constructor(
    @InjectRepository(Resume)
    public readonly resumeRepository: Repository<Resume>,
    @InjectRepository(SelectedResume)
    public readonly selectedResumeRepository: Repository<SelectedResume>
  ) {}

  async update(interviewData: InterviewerCallDto) {
    const { ids, ...rest } = interviewData;

    if (!ids || ids.length === 0) {
      return { affected: 0 };
    }

    const resultId = await this.selectedResumeRepository.find({
      where: { id: In(ids) },
      select: {
        resumeId: true,
      },
    });

    console.log("dfd", interviewData.interviewStage);
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

      const setData = {
        applicationCurretStatus: interviewData.interviewStage,
      };
      await this.resumeRepository.update({ id: In(resultId) }, setData);

      return { affected: result.affected };
    } catch (error) {
      throw new Error(`Failed to update interview calls: ${error.message}`);
    }
  }
}
