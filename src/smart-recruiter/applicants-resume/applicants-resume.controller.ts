import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApplicantsResumeService } from "./applicants-resume.service";
import { CreateResumeDto } from "./dto/create-resume.dto";

import { Resume } from "src/entity/resume";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from 'path';
import * as path from 'path';
import { Resume } from "src/entity/Resume";
@Controller("applicants-resume")
export class ApplicantsResumeController {
  constructor(public readonly resumesService: ApplicantsResumeService) {}

  @Get()
  async getAll() {
    return await this.resumesService.getAll();
  }

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Use absolute path for destination
          const uploadPath = path.resolve('./uploads/cv');
          console.log("filePath", uploadPath);
          cb(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const name = file.originalname.split(".")[0];
          const fileExtName = extname(file.originalname);
          console.log("fileExtName", fileExtName);
          const randdomName = Array(4)
            .fill(null)
            .map(() => Math.random().toString(36).substring(2, 15))
            .join("");
          callback(null, `${name}-${randdomName}${fileExtName}`);
        },
      }),
    })
  )
  async uploadResume(@UploadedFile() file: Express.Multer.File) {
    const filePath = file.path;
    console.log("filePath", filePath);
    const extractedData =
      await this.resumesService.extractDataFromPDF(filePath);
    return { extractedData, filePath };
  }
  @Post("create")
  @UseInterceptors(FileInterceptor('file')) 
  async saveResume(@Body() saveResume: CreateResumeDto, @UploadedFile() file: Express.Multer.File): Promise<Resume> {
    return this.resumesService.saveResume(saveResume, file);

  }
}
