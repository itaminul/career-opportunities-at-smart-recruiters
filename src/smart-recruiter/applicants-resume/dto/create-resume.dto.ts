import { Type } from "class-transformer";
import {
  IsString,
  IsEmail,
  IsDateString,
  IsArray,
  ValidateNested,
} from "class-validator";


class CreateResumeAttachmentDto {
  @IsString()
  attachmentFile: string;

  @IsString()
  attachmentType: string;

  @IsString()
  attachmentPath: string;
}

export class CreateResumeDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsEmail()
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
  @ValidateNested({ each: true })
  @Type(() => CreateResumeAttachmentDto)
  attachments: CreateResumeAttachmentDto[];

}

}

