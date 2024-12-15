import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Resume } from "src/entity/Resume";
import { Resume_attachments } from "src/entity/Resume_attachements";
import { Repository } from "typeorm";

@Injectable()
export class ApplicationScrutinyService {
  constructor(
    @InjectRepository(Resume)
    public readonly resumeRepository: Repository<Resume>,
    @InjectRepository(Resume_attachments)
    public readonly resumeAttachmentRepository: Repository<Resume_attachments>
  ) {}

  async getScrutinyApplicaton() {
    const queryRunner =
      this.resumeRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
    } catch (error) {
    } finally {
      await queryRunner.release();
    }
  }
}
