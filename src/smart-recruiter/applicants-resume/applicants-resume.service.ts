import {
  HttpException,
  HttpStatus,
  Injectable,
  UploadedFile,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateResumeDto } from "./dto/create-resume.dto";

import pdfParse from "pdf-parse";
import fs from "fs/promises";
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
    @UploadedFile() file: Express.Multer.File
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
      // Create the Resume entity
      const resume = this.resumeRepository.create(resumeData);
      // Save the Resume entity
      const savedResume = await this.resumeRepository.save(resume);

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
    const buffer = await fs.readFile(filePath);
    const pdfData: pdfParse = await pdfParse(buffer);
    const text = pdfData.text;

    const name = text.match(/Name:\s*(.*)/)?.[1]?.trim() || "Unknown";
    const email = text.match(/Email:\s*(.*)/)?.[1]?.trim() || "Unknown";
    const phone = text.match(/Phone:\s*(.*)/)?.[1]?.trim() || "Unknown";

    return { name, email, phone };
  }
}
