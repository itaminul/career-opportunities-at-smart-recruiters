import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Resume } from "src/entity/resume";

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

  async getScrutinyApplication(filters: {
    age?: number;
    minAge?: number;
    maxAge?: number;
    expectedSalary?: number;
    minSalary?: number;
    maxSalary?: number;
    noticePeriod?: string;
    district?: string;
    [key: string]: any;
  }) {
    try {
      console.log("filter", filters);
      const query = this.resumeRepository.createQueryBuilder('resume')
       // .leftJoinAndSelect('resume.attachments', 'attachments');

      // Age filters
      if (filters.age) {
        query.andWhere('resume.age = :age', { age: filters.age });
      } else if (filters.minAge || filters.maxAge) {
        query.andWhere('resume.age BETWEEN :minAge AND :maxAge', {
          minAge: filters.minAge || 0,
          maxAge: filters.maxAge || 100
        });
      }

      // Salary filters
      if (filters.expectedSalary) {
        query.andWhere('resume.expectedSalary = :expectedSalary', {
          expectedSalary: filters.expectedSalary
        });
      } else if (filters.minSalary || filters.maxSalary) {
        query.andWhere('resume.expectedSalary BETWEEN :minSalary AND :maxSalary', {
          minSalary: filters.minSalary || 0,
          maxSalary: filters.maxSalary || 999999999
        });
      }

      // Other filters
      if (filters.noticePeriod) {
        query.andWhere('resume.noticePeriod = :noticePeriod', {
          noticePeriod: filters.noticePeriod
        });
      }

      if (filters.district) {
        query.andWhere('resume.district LIKE :district', {
          district: `%${filters.district}%`
        });
      }

      const applications = await query.getMany();

      return {
        success: true,
        data: applications,
        message: 'Applications retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve applications',
        error: error.message
      };
    }
  }
}
