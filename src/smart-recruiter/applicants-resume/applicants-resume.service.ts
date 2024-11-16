import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateResumeDto } from "./dto/create-resume.dto";
import { Resume } from "src/entity/resume";
import { Resume_attachments } from "src/entity/resume_attachments";
import pdfParse from "pdf-parse";
import fs from "fs/promises";

@Injectable()
export class ApplicantsResumeService {
  connection: any;
  constructor(
    @InjectRepository(Resume)
    public readonly resumeRepository: Repository<Resume>,
    @InjectRepository(Resume_attachments)
    public readonly resumeAttachmentRepository: Repository<Resume_attachments>
  ) {}
  async saveResume(createResumeDto: CreateResumeDto): Promise<Resume> {
    const { attachments, ...resumeData } = createResumeDto;
    const queryRunner =
      this.resumeRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    await queryRunner.startTransaction();

    try {
      // Create the Resume entity
      const resume = this.resumeRepository.create(resumeData);

      // Save the Resume entity
      const savedResume = await queryRunner.manager.save(Resume, resume);

      if (attachments && attachments.length > 0) {
        const resumeAttachments = attachments.map((attachment) => {
          return this.resumeAttachmentRepository.create({
            ...attachment,
            resume: savedResume,
          });
        });

        // Save the attachments in the transaction
        await queryRunner.manager.save(Resume_attachments, resumeAttachments);
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
        "Internal server error: " + error.message,
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
