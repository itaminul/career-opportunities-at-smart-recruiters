// unique-validation.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Resume } from 'src/entity/resume';

@Injectable()
export class UniqueValidationService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
  ) {}

  async isFieldUnique(field: string, value: string, excludeId?: number): Promise<boolean> {
    const where: any = { [field]: value };
    
    if (excludeId) {
      where.id = Not(excludeId);
    }

    const exists = await this.resumeRepository.findOne({ where });
    return !exists;
  }
}