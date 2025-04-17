import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resume_attachments } from "./Resume_attachements";
import { JobCandidate } from "./job_candidate";


@Entity("resume")
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true})
  address: string;
  @Column({ nullable: true})
  phone: string;
  @Column({ nullable: true})
  email: string;
  @Column({ nullable: true})
  mobile: string;
  @Column({ nullable: true})
  city: string;
  @Column({ nullable: true})
  district: string;
  @Column({ nullable: true})
  division: string;
  @Column({ nullable: true})
  dateOfBirth: string;
  @Column({ nullable: true})
  currentSalary: number;
  @Column({ nullable: true})
  expectedSalary: number;
  @Column({ nullable: true})
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
