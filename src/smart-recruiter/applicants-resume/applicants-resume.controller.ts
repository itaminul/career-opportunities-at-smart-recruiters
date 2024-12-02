import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ApplicantsResumeService } from "./applicants-resume.service";
import { CreateResumeDto } from "./dto/create-resume.dto";

import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import * as fs from "fs";
import * as path from "path"; // Ensure path is imported too
import { Resume } from "src/entity/Resume";
@Controller("applicants-resume")
export class ApplicantsResumeController {
  constructor(public readonly resumesService: ApplicantsResumeService) {}

  @Get()
  async getAll() {
    return await this.resumesService.getAll();
  }

  @Post("create")
  @UseInterceptors(
    FilesInterceptor("files", 10, {
      // 'files' is the name of the form field, 10 is the max number of files
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.resolve("./uploads/cv");
          // Check if the directory exists, if not, create it
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the folder is created
          }
          cb(null, uploadPath);
        },
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
  async saveResume(
    @Body() saveResume: CreateResumeDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<Resume> {
    return this.resumesService.saveResume(saveResume, files);
  }
}
