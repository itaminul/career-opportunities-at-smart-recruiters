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

import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
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
    AnyFilesInterceptor({
      fileFilter: (req, file, callback) => {
        const ext = extname(file.originalname).toLowerCase();
        if ([".jpg", ".jpeg", ".png", ".pdf"].includes(ext)) {
          callback(null, true);
        } else {
          callback(
            new HttpException(
              `Invalid file type: ${ext}. Only JPG, PNG, and PDF are allowed.`,
              HttpStatus.BAD_REQUEST
            ),
            false
          );
        }
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          const fileExt = extname(file.originalname).toLowerCase();
          let uploadPath = "";
          if ([".jpg", ".jpeg", ".png"].includes(fileExt)) {
            uploadPath = path.resolve("./uploads/image");
          } else if (fileExt === ".pdf") {
            uploadPath = path.resolve("./uploads/cv");
          }

          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          cb(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.random().toString(36).substring(2, 15))
            .join("");
          const fileExtName = extname(file.originalname);
          const name = file.originalname.split(".")[0];
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    })
  )
  async saveResume(
    @Body() saveResume: CreateResumeDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<Resume> {
    const image = files.find((file) =>
      [".jpg", ".jpeg", ".png"].includes(
        extname(file.originalname).toLowerCase()
      )
    );
    const pdf = files.find(
      (file) => extname(file.originalname).toLowerCase() === ".pdf"
    );

    if (!image) {
      throw new HttpException(
        "An image file is required!",
        HttpStatus.BAD_REQUEST
      );
    }
    if (!pdf) {
      throw new HttpException(
        "A PDF file is required!",
        HttpStatus.BAD_REQUEST
      );
    }

    const extractedDataFromPDF = await this.resumesService.extractDataFromPDF(
      pdf.path
    );

    saveResume.name = extractedDataFromPDF.name || saveResume.name;
    saveResume.email = extractedDataFromPDF.email || saveResume.email;
    saveResume.phone = extractedDataFromPDF.phone || saveResume.phone;
    saveResume.mobile = extractedDataFromPDF.mobile || saveResume.mobile;
    saveResume.experience =
      extractedDataFromPDF.experience || saveResume.experience;
    saveResume.city = extractedDataFromPDF.city || saveResume.city;
    saveResume.district = extractedDataFromPDF.district || saveResume.district;
    saveResume.division = extractedDataFromPDF.division || saveResume.division;
    saveResume.dateOfBirth =
      extractedDataFromPDF.dateOfBirth || saveResume.dateOfBirth;

    return this.resumesService.saveResume(saveResume, pdf, image);
  }
}
