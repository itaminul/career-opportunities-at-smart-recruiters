import {
  HttpException,
  HttpStatus,
  Injectable,
  UploadedFiles,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateResumeDto } from "./dto/create-resume.dto";

import * as fs from "fs";
import * as pdfParse from "pdf-parse";

import { Resume } from "src/entity/Resume";
import { Resume_attachments } from "src/entity/Resume_attachements";

@Injectable()
export class ApplicantsResumeService {
  connection: any;
  constructor(
    @InjectRepository(Resume)
    public readonly resumeRepository: Repository<Resume>,
    @InjectRepository(Resume_attachments)
    public readonly resumeAttachmentRepository: Repository<Resume_attachments>
  ) {}

  async getAll() {
    try {
      return await this.resumeRepository.find({
        relations: {
          attachments: true,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      // Throw a generic server error if it's not a known error
      throw new HttpException(
        "Internal server error: ",
        // "Internal server error: " + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async saveResume(
    createResumeDto: CreateResumeDto,
    @UploadedFiles() file: Express.Multer.File
  ): Promise<Resume> {
    const { attachments, ...resumeData } = createResumeDto;
    const queryRunner =
      this.resumeRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    await queryRunner.startTransaction();
    try {

      
      if (file) {
        createResumeDto.attachments = createResumeDto.attachments || [];
        createResumeDto.attachments.push({
          attachmentFile: file.filename,
          attachmentType: file.mimetype,
          attachmentPath: file.path,
        });
      }
      

      // if (files && files.length > 0) {
      //   createResumeDto.attachments = createResumeDto.attachments || [];
      //   files.forEach((file) => {
      //     createResumeDto.attachments.push({
      //       attachmentFile: file.filename,
      //       attachmentType: file.mimetype,
      //       attachmentPath: file.path,
      //     });
      //   });
      // }

      // Create the Resume entity
      const resume = this.resumeRepository.create(resumeData);
      // Save the Resume entity
      const savedResume = await this.resumeRepository.save(resume);

      console.log("saved resume", savedResume);
      if (attachments && attachments.length > 0) {
        const resumeAttachments = attachments.map((attachment) => {
          return this.resumeAttachmentRepository.create({
            ...attachment,
            resume,
          });
        });

        // Save the attachments in the transaction
        await this.resumeAttachmentRepository.save(resumeAttachments);
      }

      // Commit the transaction
      await queryRunner.commitTransaction();

      return savedResume;
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error during transaction:", error);

      // Rollback transaction if there was an error
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw error;
      }

      // Throw a generic server error if it's not a known error
      throw new HttpException(
        "Internal server error: ",
        // "Internal server error: " + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    } finally {
      // Release the query runner to avoid memory leaks
      await queryRunner.release();
    }
  }

  async extractDataFromPDF(filePath: string) {
    try {
      // Read the file as a Buffer
      const buffer = await fs.promises.readFile(filePath);

      // Use pdf-parse to extract text from the PDF buffer
      const pdfData = await pdfParse(buffer);

      // Extract text from the parsed PDF
      const text = pdfData.text;
      console.log("service", text);
      // Use regex to extract specific fields from the text

      const name = text.match(/Name:\s*(.*)/)?.[1]?.trim() || "Unknown";
      const address = text.match(/Address:\s*(.*)/)?.[1]?.trim() || "Unknown";
      // const permanentAddress = text.match(/Permanent Address:\s*(.*)/)?.[1]?.trim() || "Unknown";
      const email = text.match(/Email:\s*(.*)/)?.[1]?.trim() || "Unknown";
      const phone = text.match(/Phone:\s*(.*)/)?.[1]?.trim() || "Unknown";
      const mobile = text.match(/Mobile:\s*(.*)/)?.[1]?.trim() || "Unknown";
      const experience =
        text.match(/Experience:\s*(.*)/)?.[1]?.trim() || "Unknown";
      const city = text.match(/City:\s*(.*)/)?.[1]?.trim() || "Unknown";
      const district = text.match(/District:\s*(.*)/)?.[1]?.trim() || "Unknown";
      const division = text.match(/Division:\s*(.*)/)?.[1]?.trim() || "Unknown";
      const dateOfBirth =
        text.match(/birth:\s*(.*)/)?.[1]?.trim() || "Unknown";

      return {
        name,
        address,
        email,
        phone,
        mobile,
        city,
        experience,
        district,
        division,
        dateOfBirth,
      };
    } catch (error) {
      console.error("Error reading or parsing PDF:", error);
      throw new Error("Error processing the PDF file.");
    }
  }
}
