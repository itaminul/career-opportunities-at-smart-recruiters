import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resume_attachments } from "./Resume_attachements";
import { JobCandidate } from "./job_candidate";

@Entity("resume")
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  mobile: string;
  @Column()
  city: string;
  @Column()
  district: string;
  @Column()
  division: string;
  @Column()
  dateOfBirth: string;
  @Column()
  currentSalary: number;
  @Column()
  expectedSalary: number;
  @Column()
  noticePeriod: string;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "int", nullable: true })
  updated_by: number;
  @Column({ type: "timestamp", nullable: true })
  updated_at: Date;

  @OneToMany(() => Resume_attachments, (attachment) => attachment.resume, {
    nullable: true,
  })
  resumeAttachments: Resume_attachments[];

  @OneToMany(() => JobCandidate, (jobCandidate) => jobCandidate.resume)
  jobCandidate: JobCandidate[];
}
