import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateResumeDto } from "./dto/create-resume.dto";

import { Resume_attachments } from "src/entity/Resume_attachements";
import { Resume } from "src/entity/resume";
import * as fs from "fs/promises";
import { UniqueValidationService } from "src/validators/unique-fields.validator";

const pdfParse = require("pdf-parse") as (
  buffer: Buffer
) => Promise<{ text: string }>;

@Injectable()
export class ApplicantsResumeService {
  connection: any;

  constructor(
    @InjectRepository(Resume)
    public readonly resumeRepository: Repository<Resume>,
    @InjectRepository(Resume_attachments)
    public readonly resumeAttachmentRepository: Repository<Resume_attachments>,
    private dataSource: DataSource,
    private readonly uniqueValidationService: UniqueValidationService
  ) {}

  async getAll() {
    try {
      return await this.resumeRepository.find({
        relations: {
          resumeAttachments: true,
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
    file: Express.Multer.File
  ): Promise<Resume> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const filec = `${process.env.API_BASE_URL}/${file.path}`;

    try {
      const [isUsernameUnique] = await Promise.all([
        this.uniqueValidationService.isFieldUnique(
          "username",
          createResumeDto.username
        ),
        // this.uniqueValidationService.isFieldUnique('email', createResumeDto.email),
      ]);

      if (!isUsernameUnique) {
        throw new HttpException(
          {
            success: false,
            message: "Username already exist please try another",
            statusCode: HttpStatus.CONFLICT,
            timestamp: new Date().toISOString(),
          },
          HttpStatus.CONFLICT
        );
      } else {
        // if (!isUsernameUnique || !isEmailUnique) {
        //   throw new HttpException({
        //     statusCode: HttpStatus.CONFLICT,
        //     message: 'Validation failed',
        //     errors: {
        //       username: isUsernameUnique ? undefined : 'Username already exists',
        //       email: isEmailUnique ? undefined : 'Email already exists',
        //     },
        //   }, HttpStatus.CONFLICT);
        // }

        // Extract data from PDF if it's a PDF file
        let extractedData = {
          name: "Unknown",
          email: "Unknown",
          phone: "Unknown",
          mobile: "Unknown",
          district: "Unknown",
          division: "Unknown",
          dateOfBirth: "Unknown",
          address: "Unknown",
          experience: "Unknown",
          education: "Unknown",
          skills: "Unknown",
          city: "Unknown",
        };

        if (file.mimetype === "application/pdf") {
          extractedData = await this.extractDataFromPDF(file.path);
        }

        // Merge extracted data with provided data
        // Only use extracted data if the field is not already provided in createResumeDto
        const mergedData = {
          ...createResumeDto,
          name: createResumeDto.name || extractedData.name,
          email: createResumeDto.email || extractedData.email,
          phone: createResumeDto.phone || extractedData.phone,
          mobile: createResumeDto.mobile || extractedData.mobile,
          district: createResumeDto.district || extractedData.district,
          division: createResumeDto.division || extractedData.division,
          dateOfBirth: createResumeDto.dateOfBirth || extractedData.dateOfBirth,
          address: createResumeDto.address || extractedData.address,
          experience: createResumeDto.experience || extractedData.experience,
          education: extractedData.education,
          skills: extractedData.skills,
          city: extractedData.city,
        };

        // Prepare attachment data
        if (file) {
          mergedData.attachments = mergedData.attachments || [];
          mergedData.attachments.push({
            attachmentFile: file.originalname,
            attachmentType: file.mimetype,
            attachmentPath: file.path,
          });
        }

        // Create the Resume entity
        const resumeData = { ...mergedData };
        delete resumeData.attachments;

        const resume = this.resumeRepository.create(resumeData);
        const savedResume = await queryRunner.manager.save(resume);

        // Save attachments
        if (mergedData.attachments && mergedData.attachments.length > 0) {
          const resumeAttachments = mergedData.attachments.map((attachment) =>
            this.resumeAttachmentRepository.create({
              ...attachment,
              resume: savedResume,
            })
          );
          await queryRunner.manager.save(resumeAttachments);
        }

        await queryRunner.commitTransaction();
        return savedResume;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        `Internal server error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    } finally {
      await queryRunner.release();
    }
  }

  async extractDataFromPDF(filePath: string) {
    try {
      const buffer = await fs.readFile(filePath);
      const pdfData = await pdfParse(buffer);
      const text = pdfData.text;

      // Extract name - try multiple patterns
      let name =
        this.extractField(text, /Name:?\s*([\w\s.-]+)(?:\n|$)/i) ||
        this.extractField(text, /^([\w\s.-]+)(?:\n|$)/) ||
        this.extractField(text, /([\w\s.-]+)(?:\n|Resume)/i) ||
        "Unknown";

      // Extract email - try multiple patterns
      let email =
        this.extractField(text, /Email:?\s*([\w.-]+@[\w.-]+\.\w+)/i) ||
        this.extractEmail(text) ||
        "Unknown";

      // Extract phone - try multiple patterns
      let phone =
        this.extractField(
          text,
          /(?:Phone|Tel|Telephone):?\s*(\+?[\d\s().-]{10,20})/i
        ) ||
        this.extractPhone(text) ||
        "Unknown";

      let mobile =
        this.extractField(text, /(?:Mobile):?\s*(\+?[\d\s().-]{10,20})/i) ||
        this.extractMobile(text) ||
        "Unknown";

      // Extract address - try multiple patterns
      let address =
        this.extractField(
          text,
          /(?:Address|Location|Residence):?\s*([\w\s,.-]+(?:\n[\w\s,.-]+){0,2})/i
        ) ||
        this.extractAddress(text) ||
        "Unknown";

      // Extract Division
      const division = this.extractDivision(text) || "Unknown";

      // Extract District
      const district = this.extractDistrict(text) || "Unknown";

      // Extract Date of Birth
      const dateOfBirth = this.extractDateOfBirth(text) || "Unknown";
      // Extract experience
      let experience = this.extractExperience(text) || "Unknown";

      // Extract education
      let education = this.extractEducation(text) || "Unknown";

      // Extract skills
      let skills = this.extractSkills(text) || "Unknown";
      let city = this.extractCity(text) || "Unknown";
      return {
        name,
        email,
        phone,
        mobile,
        address,
        division,
        district,
        dateOfBirth,
        experience,
        education,
        skills,
        city,
      };
    } catch (error) {
      return {
        name: "Unknown",
        email: "Unknown",
        phone: "Unknown",
        mobile: "Unknown",
        division: "Unknown",
        district: "Unknown",
        dateOfBirth: "Unknown",
        address: "Unknown",
        experience: "Unknown",
        education: "Unknown",
        skills: "Unknown",
        city: "Unknown",
      };
    }
  }

  private extractField(text: string, regex: RegExp): string | null {
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  }

  private extractEmail(text: string): string | null {
    // More comprehensive email regex
    const emailRegex = /[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}/g;
    const matches = text.match(emailRegex);

    if (matches && matches.length > 0) {
      return matches[0];
    }
    return null;
  }

  private extractPhone(text: string): string | null {
    // More comprehensive phone regex patterns
    const phonePatterns = [
      /(?:(?:\+|00)[\d]{1,3}[\s-]?)?(?:(?:$$[\d]{1,3}$$)|(?:[\d]{1,3}))[\s.-]?[\d]{3,4}[\s.-]?[\d]{3,4}/g,
      /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
      /$$\d{3}$$\s*\d{3}[-.]?\d{4}/g,
      /\+\d{1,3}\s?\d{3,4}\s?\d{3,4}\s?\d{3,4}/g,
    ];

    for (const pattern of phonePatterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        return matches[0];
      }
    }
    return null;
  }

  private extractMobile(text: string): string | null {
    // More comprehensive phone regex patterns
    const phonePatterns = [
      /(?:(?:\+|00)[\d]{1,3}[\s-]?)?(?:(?:$$[\d]{1,3}$$)|(?:[\d]{1,3}))[\s.-]?[\d]{3,4}[\s.-]?[\d]{3,4}/g,
      /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
      /$$\d{3}$$\s*\d{3}[-.]?\d{4}/g,
      /\+\d{1,3}\s?\d{3,4}\s?\d{3,4}\s?\d{3,4}/g,
    ];

    for (const pattern of phonePatterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        return matches[0];
      }
    }
    return null;
  }

  private extractAddress(text: string): string | null {
    // Look for common address patterns
    // This is challenging as addresses vary widely
    const addressPatterns = [
      /(?:Address|Location|Residence):?\s*([\w\s,.-]+(?:\n[\w\s,.-]+){0,2})/i,
      /(\d+\s+[\w\s,.-]+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)[\w\s,.-]*)/i,
      /(\w+\s+\w+\s+\d+,\s+\w+,\s+\w+\s+\d+)/i,
    ];

    for (const pattern of addressPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    // Try to find postal code or zip code patterns
    const postalCodeMatch =
      text.match(/\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b/i) || // Canadian postal code
      text.match(/\b\d{5}(?:-\d{4})?\b/); // US ZIP code

    if (postalCodeMatch) {
      // Look for text around the postal code
      const postalCodeIndex = text.indexOf(postalCodeMatch[0]);
      if (postalCodeIndex > 20) {
        const addressCandidate = text.substring(
          postalCodeIndex - 50,
          postalCodeIndex + 20
        );
        return addressCandidate.trim();
      }
    }

    return null;
  }

  // New extraction methods for Division, District, Date of Birth, and Experience
  private extractDivision(text: string): string | null {
    // Multiple patterns to extract Division
    const divisionPatterns = [
      /Division:?\s*([\w\s.-]+)(?:\n|$)/i,
      /(?:Division|Region):?\s*([\w\s.-]+)(?:\n|,|$)/i,
      /(?:Location|Area):?\s*(?:[\w\s.-]+),\s*([\w\s.-]+)(?:\n|,|$)/i,
      /(?:Address|Location):?(?:[\s\S]*?)(?:Division|Region):?\s*([\w\s.-]+)(?:\n|,|$)/i,
    ];

    for (const pattern of divisionPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && match[1].trim().length > 0) {
        return match[1].trim();
      }
    }

    // Look for common division names in Bangladesh
    const commonDivisions = [
      "Dhaka",
      "Chittagong",
      "Rajshahi",
      "Khulna",
      "Barisal",
      "Sylhet",
      "Rangpur",
      "Mymensingh",
    ];

    for (const division of commonDivisions) {
      const divisionRegex = new RegExp(`\\b${division}\\b`, "i");
      if (divisionRegex.test(text)) {
        return division;
      }
    }

    return null;
  }

  private extractDistrict(text: string): string | null {
    // Multiple patterns to extract District
    const districtPatterns = [
      /District:?\s*([\w\s.-]+)(?:\n|$)/i,
      /(?:District|City):?\s*([\w\s.-]+)(?:\n|,|$)/i,
      /(?:Location|Area):?\s*([\w\s.-]+),\s*(?:[\w\s.-]+)(?:\n|,|$)/i,
      /(?:Address|Location):?(?:[\s\S]*?)(?:District|City):?\s*([\w\s.-]+)(?:\n|,|$)/i,
    ];

    for (const pattern of districtPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && match[1].trim().length > 0) {
        return match[1].trim();
      }
    }

    // Look for common district names in Bangladesh
    const commonDistricts = [
      "Dhaka",
      "Gazipur",
      "Narayanganj",
      "Chittagong",
      "Cox's Bazar",
      "Rajshahi",
      "Khulna",
      "Barisal",
      "Sylhet",
      "Rangpur",
      "Mymensingh",
      "Comilla",
      "Narsingdi",
      "Jessore",
      "Bogra",
      "Dinajpur",
    ];

    for (const district of commonDistricts) {
      const districtRegex = new RegExp(`\\b${district}\\b`, "i");
      if (districtRegex.test(text)) {
        return district;
      }
    }

    return null;
  }

  private extractDateOfBirth(text: string): string | null {
    // Multiple patterns to extract Date of Birth
    const dobPatterns = [
      /(?:Date\s*of\s*Birth|DOB|Birth\s*Date):?\s*(\d{1,2}[-./]\d{1,2}[-./]\d{2,4}|\d{2,4}[-./]\d{1,2}[-./]\d{1,2})/i,
      /(?:Date\s*of\s*Birth|DOB|Birth\s*Date):?\s*(\w+\s+\d{1,2}(?:st|nd|rd|th)?,?\s*\d{2,4}|\d{1,2}(?:st|nd|rd|th)?\s+\w+,?\s*\d{2,4})/i,
      /(?:Date\s*of\s*Birth|DOB|Birth\s*Date):?\s*(\d{1,2}(?:st|nd|rd|th)?\s+\w+\s+\d{2,4})/i,
      /(?:Born\s*on):?\s*(\d{1,2}[-./]\d{1,2}[-./]\d{2,4}|\d{2,4}[-./]\d{1,2}[-./]\d{1,2})/i,
    ];

    for (const pattern of dobPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && match[1].trim().length > 0) {
        return match[1].trim();
      }
    }

    // Look for date patterns in the text
    const datePatterns = [
      /\b(\d{1,2}[-./]\d{1,2}[-./]\d{2,4})\b/,
      /\b(\d{2,4}[-./]\d{1,2}[-./]\d{1,2})\b/,
      /\b(\d{1,2}(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{2,4})\b/i,
      /\b((?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}(?:st|nd|rd|th)?,?\s*\d{2,4})\b/i,
    ];

    // Look for date patterns near "birth" or "born" keywords
    const birthContext = text.match(
      /(?:birth|born|dob)(?:[\s\S]{0,50})((?:\d{1,2}[-./]\d{1,2}[-./]\d{2,4}|\d{2,4}[-./]\d{1,2}[-./]\d{1,2}|\d{1,2}(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{2,4}|(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}(?:st|nd|rd|th)?,?\s*\d{2,4}))/i
    );

    if (birthContext && birthContext[1]) {
      return birthContext[1].trim();
    }

    // If no specific birth date context is found, look for any date pattern
    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match && match[1] && match[1].trim().length > 0) {
        // Only return if it looks like a valid date (not just any numbers)
        if (
          /(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i.test(
            match[1]
          ) ||
          /[-./]/.test(match[1])
        ) {
          return match[1].trim();
        }
      }
    }

    return null;
  }

  private extractExperience(text: string): string | null {
    // Look for experience section
    const experienceSectionPatterns = [
      /(?:Work\s*Experience|Professional\s*Experience|Employment\s*History):?\s*([\s\S]*?)(?:Education|Skills|References|Qualifications|$)/i,
      /(?:Experience):?\s*([\s\S]*?)(?:Education|Skills|References|Qualifications|$)/i,
    ];

    for (const pattern of experienceSectionPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && match[1].trim().length > 10) {
        return match[1].trim().substring(0, 500); // Limit to 500 chars
      }
    }

    // Try to extract years of experience
    const yearsPatterns = [
      /(\d+)\+?\s*(?:years|yrs)(?:\s*of\s*experience)?/i,
      /experience\s*(?:of|for)?\s*(\d+)\+?\s*(?:years|yrs)/i,
    ];

    for (const pattern of yearsPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return `${match[1]} years`;
      }
    }

    return null;
  }

  private extractEducation(text: string): string | null {
    // Look for education section
    const educationSectionPatterns = [
      /(?:Education|Academic\s*Background|Qualifications):?\s*([\s\S]*?)(?:Experience|Skills|References|Work\s*History|$)/i,
      /(?:Education):?\s*([\s\S]*?)(?:Experience|Skills|References|$)/i,
    ];

    for (const pattern of educationSectionPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && match[1].trim().length > 10) {
        return match[1].trim().substring(0, 500); // Limit to 500 chars
      }
    }

    // Look for degree mentions
    const degreeMatch = text.match(
      /(?:Bachelor|Master|PhD|BSc|MSc|MBA|BA|BS|MS|MD|JD)(?:\s*of\s*|\s+in\s+|\s+)(?:Science|Arts|Engineering|Business|Administration|[A-Za-z]+)(?:\s*[,(].*?[,)])?/i
    );

    if (degreeMatch) {
      return degreeMatch[0];
    }

    return null;
  }

  private extractSkills(text: string): string | null {
    // Look for skills section
    const skillsSectionPatterns = [
      /(?:Skills|Technical\s*Skills|Core\s*Competencies|Expertise):?\s*([\s\S]*?)(?:Experience|Education|References|Work\s*History|$)/i,
      /(?:Skills):?\s*([\s\S]*?)(?:Experience|Education|References|$)/i,
    ];

    for (const pattern of skillsSectionPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && match[1].trim().length > 10) {
        return match[1].trim().substring(0, 500); // Limit to 500 chars
      }
    }

    // Look for skill lists (comma or bullet separated)
    const skillListMatch = text.match(
      /(?:Skills|Expertise|Proficient\s*in):?\s*((?:[A-Za-z]+(?:\s*[A-Za-z]+)*(?:,|\s*•|\s*\*|\s*-|\s*–|\s*—|\s*\|)\s*)+[A-Za-z]+(?:\s*[A-Za-z]+)*)/i
    );

    if (skillListMatch && skillListMatch[1]) {
      return skillListMatch[1].trim();
    }

    return null;
  }

  private extractCity(text: string): string | null {
    // Multiple patterns to extract District
    const cityPatterns = [
      /(?:City):?\s*([\w\s.-]+)(?:\n|,|$)/i,
      /(?:Location|Area):?\s*([\w\s.-]+),\s*(?:[\w\s.-]+)(?:\n|,|$)/i,
      /(?:Location):?(?:[\s\S]*?)(?:District|City):?\s*([\w\s.-]+)(?:\n|,|$)/i,
    ];

    for (const pattern of cityPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && match[1].trim().length > 0) {
        return match[1].trim();
      }
    }

    // Look for common district names in Bangladesh
    const commonCity = [
      "Dhaka",
      "Gazipur",
      "Narayanganj",
      "Chittagong",
      "Cox's Bazar",
      "Rajshahi",
      "Khulna",
      "Barisal",
      "Sylhet",
      "Rangpur",
      "Mymensingh",
      "Comilla",
      "Narsingdi",
      "Jessore",
      "Bogra",
      "Dinajpur",
    ];

    for (const city of commonCity) {
      const districtRegex = new RegExp(`\\b${city}\\b`, "i");
      if (districtRegex.test(text)) {
        return city;
      }
    }

    return null;
  }
}
