import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApplicantsResumeService } from "./applicants-resume.service";
import { CreateResumeDto } from "./dto/create-resume.dto";

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import * as path from "path";
import { Resume } from "src/entity/resume";
import * as fs from "fs";

@Controller("applicants-resume")
export class ApplicantsResumeController {
  constructor(public readonly resumesService: ApplicantsResumeService) {}

  @Get()
  async getAll() {
    return await this.resumesService.getAll();
  }


  
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(process.cwd(), 'uploads', 'resumes');
          require('fs').mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const name = path.parse(file.originalname).name;
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `resume-${Date.now()}-${randomName}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return callback(new BadRequestException('Only PDF and Word documents are allowed'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadResume(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const filePath = file.path;
    console.log(`File saved at: ${filePath}`);

    // Extract data from PDF if it's a PDF file
    let extractedData = {};
    if (file.mimetype === 'application/pdf') {
      extractedData = await this.resumesService.extractDataFromPDF(filePath);
    }

    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      originalname: file.originalname,
      path: filePath,
      size: file.size,
      mimetype: file.mimetype,
      extractedData,
    };
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(process.cwd(), 'uploads', 'resumes');
          require('fs').mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const name = path.parse(file.originalname).name;
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `resume-${Date.now()}-${randomName}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return callback(new BadRequestException('Only PDF and Word documents are allowed'), false);
        }
        callback(null, true);
      },
    }),
  )
  async saveResume(
    @Body() saveResume: CreateResumeDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Resume> {
    try {
      if (!file) {
        throw new BadRequestException('Resume file is required');
      }

      const data = await this.resumesService.saveResume(saveResume, file);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
