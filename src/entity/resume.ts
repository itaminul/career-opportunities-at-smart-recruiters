import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resume_attachments } from "./Resume_attachements";
import { JobCandidate } from "./job_candidate";
import { SelectedResume } from "./selectedresume";

@Entity("resume")
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  mobile: string;
  @Column({ nullable: true })
  city: string;
  @Column({ nullable: true })
  district: string;
  @Column({ nullable: true })
  division: string;
  @Column({ nullable: true })
  dateOfBirth: string;
  @Column({ nullable: true })
  currentSalary: number;
  @Column({ nullable: true })
  expectedSalary: number;
  @Column({ nullable: true })
  noticePeriod: string;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "int", nullable: true })
  updated_by: number;
  @Column({ type: "timestamp", nullable: true })
  updated_at: Date;
  @Column({ nullable: true })
  positionName?: string;
  @Column({ nullable: true })
  resumeLink: string;
  @Column({ nullable: true })
  linkedInProfileLink: string;
  @Column({ nullable: true })
  githubLink: string;
  @Column({ nullable: true })
  websiteLink: string;
  @Column({ nullable: true })
  currentJobTitle: string;
  @Column({ nullable: true })
  currentCompanyName: string;
  @Column({ nullable: true })
  education: string;
  @Column({ nullable: true })
  certifications: string;
  @Column({ nullable: true })
  languages: string;
  @Column({ nullable: true })
  reference: string;
  @Column({ nullable: true })
  jobPossition: string;
  @Column({ nullable: true })
  experience: string;
  @Column({ nullable: true })
  projects: string;
  @Column({ nullable: true })
  hobies: string;
  @Column({ nullable: true })
  programming: string;
  @Column({ nullable: true })
  skillsTechnologies: string;
  @Column({ nullable: true })
  nameOfCV: string;
  @Column({ default: 0 })
  applicationCurretStatus: number;
  age?: number;

  @OneToMany(() => Resume_attachments, (attachment) => attachment.resume, {
    nullable: true,
  })
  resumeAttachments: Resume_attachments[];

  @OneToMany(() => JobCandidate, (jobCandidate) => jobCandidate.resume)
  jobCandidate: JobCandidate[];

  @OneToMany(() => SelectedResume, (selectdRe) => selectdRe.selectedresume)
  selectedresume: SelectedResume[];

  @Column({ nullable: false, unique: true })
  username: string;
  @Column({ nullable: false })
  password: string;
  @Column({ default: "candidate" })
  roleName: string;
  @Column({ default: true })
  activeStatus: boolean;
  @Column({ default: 1 })
  orgId: number;
}
