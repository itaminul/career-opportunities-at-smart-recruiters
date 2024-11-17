import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApplicantsResumeService } from "./applicants-resume.service";
import { CreateResumeDto } from "./dto/create-resume.dto";

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { Resume } from "src/entity/Resume";
@Controller("applicants-resume")
export class ApplicantsResumeController {
  constructor(public readonly resumesService: ApplicantsResumeService) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/cv",
        filename: (req, file, callback) => {
          const name = file.originalname.split(".")[0];
          const fileExtName = extname(file.originalname);
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
    const extractedData =
      await this.resumesService.extractDataFromPDF(filePath);
    return { extractedData, filePath };
  }
  @Post()
  async saveResume(@Body() saveResume: CreateResumeDto): Promise<Resume> {
    return this.resumesService.saveResume(saveResume);
  }
}
