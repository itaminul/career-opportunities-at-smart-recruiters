import {
  IsOptional,
  IsString,
  IsEmail,
  IsDateString,
  IsNumber,
} from "class-validator";


export class SelectedResumeDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsOptional()
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
  expectedSalary: number;
  @IsOptional()
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
  @IsNumber()
  applicationStatus: number;
}
