import { Type } from "class-transformer";
import {
  IsString,
  IsEmail,
  IsDateString,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNotEmpty,
  Validate
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
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;  

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
  expectedSalary: number;
  @IsString()
  noticePeriod: string;
  @IsOptional()
  currentSalary: number;
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
