import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Resume } from "src/entity/resume";
import { Resume_attachments } from "src/entity/Resume_attachements";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Resume)
    public readonly resumeRepository: Repository<Resume>,
    @InjectRepository(Resume_attachments)
    public readonly resumeAttacheRepository: Repository<Resume_attachments>
  ) {}

  async login() {}
}
