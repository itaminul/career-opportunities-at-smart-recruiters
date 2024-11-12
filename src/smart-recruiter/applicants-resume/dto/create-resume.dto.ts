// src/resumes/dto/create-resume.dto.ts

import {
  IsString,
  IsOptional,
  IsDateString,
  IsArray,
  Matches,
} from "class-validator";

export class CreateResumeDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  mobile: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  division: string;

  @IsDateString()
  dateOfBirth: string;

  @IsArray()
  @IsOptional()
  attachments?: CreateResumeAttachmentDto[]; // Optional field for attachments
}

export class CreateResumeAttachmentDto {
  @IsString()
  @Matches(/^.*\.pdf$/, { message: "Attachment file must be a PDF." })
  attachmentFile: string;

  @IsString()
  attachmentType: string;

  @IsString()
  attachmentPath: string;
}
