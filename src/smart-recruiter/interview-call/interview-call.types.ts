import { InterviewerCallDto } from "./dto/interview-call.dto";

// Interface for the update payload (extends the DTO but converts dates)
export interface InterviewCallUpdateData
  extends Omit<InterviewerCallDto, "ids" | "interviewScheduledDate"> {
  interviewScheduledDate: Date;
  interviewStage: number; // Adding status since we always set it to 1
  Interviewer: string
}

// Interface for the service response
export interface InterviewCallUpdateResult {
  affected?: number;
}
