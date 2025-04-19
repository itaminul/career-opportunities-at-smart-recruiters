import { IsOptional, IsNumber, IsString } from "class-validator";

export class ScrutinyFiltersDto {
  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsNumber()
  minAge?: number;

  @IsOptional()
  @IsNumber()
  maxAge?: number;

  @IsOptional()
  @IsNumber()
  expectedSalary?: number;

  @IsOptional()
  @IsNumber()
  currentSalary: number;
  @IsOptional()
  @IsString()
  division: string;

  @IsOptional()
  @IsNumber()
  minSalary?: number;

  @IsOptional()
  @IsNumber()
  maxSalary?: number;

  @IsOptional()
  @IsString()
  noticePeriod?: string;

  @IsOptional()
  @IsString()
  district?: string;
}
