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
    minSalary?: number;
    maxSalary?: number;
   // minAge?: number;
   // maxAge?: number;
    noticePeriod?: string;
    district?: string;
  }) {
    try {
  
      const query = this.resumeRepository.createQueryBuilder('resume');
  
      let hasFilter = false;
  
      // Salary Range
      if (filters.minSalary !== undefined || filters.maxSalary !== undefined) {
        query.andWhere('resume.expectedSalary BETWEEN :minSalary AND :maxSalary', {
          minSalary: filters.minSalary ?? 0,
          maxSalary: filters.maxSalary ?? 9999999,
        });
        hasFilter = true;
      }
  
      // Age Range
      // if (filters.minAge !== undefined || filters.maxAge !== undefined) {
      //   query.andWhere('resume.age BETWEEN :minAge AND :maxAge', {
      //     minAge: filters.minAge ?? 0,
      //     maxAge: filters.maxAge ?? 100,
      //   });
      //   hasFilter = true;
      // }
  
      // Notice Period
      if (filters.noticePeriod) {
        query.andWhere('resume.noticePeriod = :noticePeriod', {
          noticePeriod: filters.noticePeriod,
        });
        hasFilter = true;
      }
  
      // District
      if (filters.district) {
        query.andWhere('LOWER(resume.district) LIKE LOWER(:district)', {
          district: `%${filters.district}%`,
        });
        hasFilter = true;
      }
  
      if (!hasFilter) {
        return {
          success: false,
          message: 'Please provide at least one filter (salary, age, noticePeriod, or district).',
        };
      }
  
      const applications = await query.getMany();
  
      return {
        success: true,
        data: applications,
        message: 'Applications retrieved based on provided filters',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve applications',
        error: error.message,
      };
    }
  }

}
