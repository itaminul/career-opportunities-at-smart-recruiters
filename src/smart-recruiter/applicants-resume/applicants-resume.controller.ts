import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
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

  
  //pdf
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: (req, file, callback) => {
        const fileExt = extname(file.originalname).toLowerCase();
        if (fileExt !== ".pdf") {
          return callback(
            new HttpException(
              "Only PDF files are allowed!",
              HttpStatus.BAD_REQUEST
            ),
            false
          );
        }
        callback(null, true);
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.resolve("./uploads/cv");
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const name = file.originalname.split(".")[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.random().toString(36).substring(2, 15))
            .join("");
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    })
  )
  // @UseInterceptors(
  //   FilesInterceptor("files", 10, {
  //     fileFilter: (req, file, callback) => {
  //       const fileExt = extname(file.originalname).toLowerCase();
  //       if (fileExt !== ".pdf") {
  //         return callback(
  //           new HttpException(
  //             "Only PDF files are allowed!",
  //             HttpStatus.BAD_REQUEST
  //           ),
  //           false
  //         );
  //       }
  //       callback(null, true);
  //     },
  //     storage: diskStorage({
  //       destination: (req, file, cb) => {
  //         const uploadPath = path.resolve("./uploads/cv");
  //         if (!fs.existsSync(uploadPath)) {
  //           fs.mkdirSync(uploadPath, { recursive: true });
  //         }
  //         cb(null, uploadPath);
  //       },
  //       filename: (req, file, callback) => {
  //         const name = file.originalname.split(".")[0];
  //         const fileExtName = extname(file.originalname);
  //         const randomName = Array(4)
  //           .fill(null)
  //           .map(() => Math.random().toString(36).substring(2, 15))
  //           .join("");
  //         callback(null, `${name}-${randomName}${fileExtName}`);
  //       },
  //     }),
  //   })
  // )
  async saveResume(
    @Body() saveResume: CreateResumeDto,
    @UploadedFiles() file: Express.Multer.File
  ): Promise<Resume> {
    if (file) {
      const extractedDataFromPDF = await this.resumesService.extractDataFromPDF(
        file[0].path
      );
      console.log("controller", extractedDataFromPDF);
      saveResume.name = extractedDataFromPDF.name || saveResume.name;
      saveResume.email = extractedDataFromPDF.email || saveResume.email;
      saveResume.phone = extractedDataFromPDF.email || saveResume.phone;
      saveResume.mobile = extractedDataFromPDF.mobile || saveResume.mobile;
      saveResume.experience =
        extractedDataFromPDF.experience || saveResume.experience;
      saveResume.city = extractedDataFromPDF.city || saveResume.city;
      saveResume.district =
        extractedDataFromPDF.district || saveResume.district;
      saveResume.division =
        extractedDataFromPDF.division || saveResume.division;
      saveResume.dateOfBirth =
        extractedDataFromPDF.dateOfBirth || saveResume.dateOfBirth;
    }
    return this.resumesService.saveResume(saveResume, file);
  }
}
