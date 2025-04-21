import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Resume } from "src/entity/resume";
import { SelectedResume } from "src/entity/selectedresume";
import { In, Repository } from "typeorm";

@Injectable()
export class SelectedResumeService {
  constructor(
    @InjectRepository(Resume)
    public readonly resumeRepository: Repository<Resume>,
    @InjectRepository(SelectedResume)
    public readonly selectedResumeRepository: Repository<SelectedResume>
  ) {}

  async create(getId: number[]) {
    try {
      const resumes = await this.resumeRepository.find({
        where: {
          id: In(getId),
        },
      });

      const existingResumes = await this.selectedResumeRepository.find({
        where: {
          resumeId: In(getId),
        },
      });

      const existingIds = existingResumes.map((resume) => resume.resumeId);

      const newResumes = resumes.filter(
        (resume) => !existingIds.includes(resume.id)
      );

      const insertedResumes = [];
      for (const resume of newResumes) {
        // Prepare the object to be inserted
        const createNewObject = {
          resumeId: resume.id,
          name: resume.name,
          address: resume.address,
          phone: resume.phone,
          email: resume.email,
          mobile: resume.mobile,
          city: resume.city,
          district: resume.district,
          division: resume.division,
          dateOfBirth: resume.dateOfBirth,
          currentSalary: resume.currentSalary,
          expectedSalary: resume.expectedSalary,
          noticePeriod: resume.noticePeriod,
          created_at: resume.created_at,
          updated_by: resume.updated_by,
          updated_at: resume.updated_at,
          positionName: resume.positionName,
          resumeLink: resume.resumeLink,
          linkedInProfileLink: resume.linkedInProfileLink,
          githubLink: resume.githubLink,
          websiteLink: resume.websiteLink,
          currentJobTitle: resume.currentJobTitle,
          currentCompanyName: resume.currentCompanyName,
          education: resume.education,
          certifications: resume.certifications,
          languages: resume.languages,
          reference: resume.reference,
          jobPossition: resume.jobPossition,
          experience: resume.experience,
          projects: resume.projects,
          hobies: resume.hobies,
          programming: resume.programming,
          skillsTechnologies: resume.skillsTechnologies,
          nameOfCV: resume.nameOfCV,
        };

        // Save the newly created SelectedResume entity
        const savedResume =
          await this.selectedResumeRepository.save(createNewObject);
        insertedResumes.push(savedResume); // Add to the list of inserted resumes
      }

   
      return insertedResumes;
    } catch (error) {
      throw error; // Handle any errors
    }
  }
}
