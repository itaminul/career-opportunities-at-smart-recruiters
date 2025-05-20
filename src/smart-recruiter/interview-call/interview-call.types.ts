import { InterviewerCallDto } from "./dto/interview-call.dto";

export interface InterviewCallUpdateData
  extends Omit<InterviewerCallDto, "ids" | "interviewScheduledDate"> {
  interviewScheduledDate: Date;
  interviewStage: number;
  Interviewer: string;
}

export interface InterviewCallUpdateResult {
  affected?: number;
}
