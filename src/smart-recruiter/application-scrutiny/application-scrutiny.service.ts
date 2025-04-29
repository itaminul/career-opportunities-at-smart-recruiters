import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Resume } from "src/entity/resume";

import { Resume_attachments } from "src/entity/Resume_attachements";
import { Repository } from "typeorm";
import { ScrutinyFiltersDto } from "./dto/scrutiny-filters.dto";

@Injectable()
export class ApplicationScrutinyService {
  constructor(
    @InjectRepository(Resume)
    public readonly resumeRepository: Repository<Resume>,
    @InjectRepository(Resume_attachments)
    public readonly resumeAttachmentRepository: Repository<Resume_attachments>
  ) {}

  async getScrutinyApplication(filters: ScrutinyFiltersDto) {
    try {
      const query = this.resumeRepository.createQueryBuilder("resume");
      console.log(`Total records: ${query}`);
      let hasFilter = false;

      // Salary Range
      if (filters.minSalary !== undefined || filters.maxSalary !== undefined) {
        query.andWhere(
          "resume.expectedSalary BETWEEN :minSalary AND :maxSalary",
          {
            minSalary: filters.minSalary ?? 0,
            maxSalary: filters.maxSalary ?? 9999999,
          }
        );
        hasFilter = true;
      }

      // Notice Period
      if (filters.noticePeriod) {
        query.andWhere("resume.noticePeriod = :noticePeriod", {
          noticePeriod: filters.noticePeriod,
        });
        hasFilter = true;
      }

      // District
      if (filters.district) {
        query.andWhere("LOWER(resume.district) LIKE LOWER(:district)", {
          district: `%${filters.district}%`,
        });
        hasFilter = true;
      }

      if (filters.minAge !== undefined || filters.maxAge !== undefined) {
        const currentDate = new Date();

        if (filters.minAge !== undefined) {
          // Calculate maximum birth date (youngest possible age)
          const maxBirthDate = new Date(
            currentDate.getFullYear() - filters.minAge,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          query.andWhere("resume.dateOfBirth <= :maxBirthDate", {
            maxBirthDate: maxBirthDate.toISOString().split("T")[0],
          });
        }

        if (filters.maxAge !== undefined) {
          // Calculate minimum birth date (oldest possible age)
          const minBirthDate = new Date(
            currentDate.getFullYear() - filters.maxAge - 1,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          query.andWhere("resume.dateOfBirth >= :minBirthDate", {
            minBirthDate: minBirthDate.toISOString().split("T")[0],
          });
        }

        hasFilter = true;
      }

      if (!hasFilter) {
        return {
          success: false,
          message:
            "Please provide at least one filter (salary, age, noticePeriod, or district).",
        };
      }

      const applications = await query.getMany();

      // Add calculated age to each response if age filtering was used
      if (filters.minAge !== undefined || filters.maxAge !== undefined) {
        applications.forEach((app) => {
          app.age = this.calculateAge(new Date(app.dateOfBirth));
        });
      }

      if (query[0]) {
        return {
          success: true,
          data: applications,
          message: "Applications retrieved based on provided filters",
        };
      } else {
        return {
          success: true,
          data: applications,
          message: "Data not found",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Failed to retrieve applications",
        error: error.message,
      };
    }
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
