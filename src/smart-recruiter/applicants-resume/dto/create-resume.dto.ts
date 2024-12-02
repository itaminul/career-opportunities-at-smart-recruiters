import { Type } from "class-transformer";
import {
  IsString,
  IsEmail,
  IsDateString,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNotEmpty,
} from "class-validator";

class CreateResumeAttachmentDto {
  @IsOptional()
  @IsString()
  attachmentFile: string;
  @IsOptional()
  @IsString()
  attachmentType: string;
  @IsOptional()
  @IsString()
  attachmentPath: string;
}

export class CreateResumeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  phone: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  mobile: string;
  @IsOptional()
  @IsString()
  experience: string;
  @IsOptional()
  @IsString()
  present_salary: string;
  @IsOptional()
  @IsString()
  expected_salary: string;

  @IsOptional()
  @IsString()
  city: string;
  @IsOptional()
  @IsString()
  district: string;
  @IsOptional()
  @IsString()
  division: string;
  @IsOptional()
  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  notice_period: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResumeAttachmentDto)
  attachments: CreateResumeAttachmentDto[];
}
