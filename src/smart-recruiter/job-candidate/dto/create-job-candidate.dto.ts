import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateJobCandidateDto {
  @IsNotEmpty()
  @IsNumber()
  candidateStatus: number;
  @IsOptional()
  @IsString()
  interviewMessages: string;
  @IsOptional()
  @IsString()
  interViewDate: string;
  @IsOptional()
  @IsString()
  interViewTime: string;
  @IsOptional()
  @IsString()
  selectedwMessages: string;
  @IsOptional()
  @IsString()
  remarks: string;
}
