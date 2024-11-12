import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Resume } from "@src/entity/resume";
import { Resume_attachments } from "@src/entity/resume_attachments";
import { Repository } from "typeorm";
import { CreateResumeDto } from "./dto/create-resume.dto";

@Injectable()
export class ApplicantsResumeService {
  constructor(
    @InjectRepository(Resume)
    public readonly resumeRepository: Repository<Resume>,
    @InjectRepository(Resume_attachments)
    public readonly resumeAttachmentRepository: Repository<Resume_attachments>
  ) {}

  async create(createResumeDto: CreateResumeDto): Promise<Resume> {
    const { attachments, ...resumeData } = createResumeDto;
    const resume = this.resumeRepository.create(resumeData);
    const savedResume = await this.resumeRepository.save(resume);
    if (attachments && attachments.length > 0) {
      const resumeAttachments = attachments.map((attachment) => {
        const resumeAttachment = this.resumeAttachmentRepository.create({
          ...attachment,
          resume: savedResume, 
        });
        return resumeAttachment;
      });

      // Save all the attachments
      await this.resumeAttachmentRepository.save(resumeAttachments);
    }
    return savedResume;
  }
}
