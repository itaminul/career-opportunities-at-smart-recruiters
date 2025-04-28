import { InterviewerCallDto } from "./dto/interview-call.dto";

export interface InterviewCallUpdateData
  extends Omit<InterviewerCallDto, "ids" | "interviewScheduledDate"> {
  interviewScheduledDate: Date;
  interviewStage: number;
  activeStatus: boolean;
}

export interface InterviewCallUpdateResult {
  affected?: number;
}
