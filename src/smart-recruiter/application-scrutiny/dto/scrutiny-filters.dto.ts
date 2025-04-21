import { Type } from "class-transformer";
import { IsOptional, IsNumber, IsString, Min, Max } from "class-validator";

export class ScrutinyFiltersDto {
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
  @IsString()
  positionName: string;

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
  @IsOptional()
  @IsString()
  dateOfBirth?: string;
  @IsOptional()
  @IsString()
  ageOfDateTo?: string;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Type(() => Number)
  age?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  minAge?: number; // For age range (minimum age)

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Type(() => Number)
  maxAge?: number; // For age range (maximum age)
}
