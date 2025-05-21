import { Type } from "class-transformer";
import { IsOptional, IsNumber, IsString, IsNotEmpty, IsArray } from "class-validator";

export class InterviewerCallDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  ids: number[];

  @IsNotEmpty()
  @IsString()
  Interviewer: string;
  
  @IsNotEmpty()
  @IsNumber()
  interviewStage: number;

  @IsNotEmpty()
  @IsString()
  interviewScheduledDate: string;

  @IsNotEmpty()
  @IsString()
  interviewScheduledTime: string;

  @IsNotEmpty()
  @IsString()
  interviewAddress: string;

  @IsOptional()
  @IsString()
  messagesForInterviwer: string;
  @IsOptional()
  @IsString()
  remarksInterviewStatuge: string;
}
