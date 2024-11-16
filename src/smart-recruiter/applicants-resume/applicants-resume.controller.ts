import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApplicantsResumeService } from "./applicants-resume.service";
import { CreateResumeDto } from "./dto/create-resume.dto";
import { Resume } from "src/entity/resume";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
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
    return { extname, filePath };
  }
  @Post()
  async saveResume(@Body() saveResume: CreateResumeDto): Promise<Resume> {
    return this.resumesService.saveResume(saveResume);
  }
}
