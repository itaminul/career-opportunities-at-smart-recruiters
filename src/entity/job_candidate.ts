import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Resume } from "./Resume";

@Entity("job_candidate")
export class JobCandidate {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false }) // 1 call for interview 2 final selected
  candidateStatus: number;
  @Column({ nullable: true })
  interviewMessages: string;
  @Column({ nullable: true })
  interViewDate: string;
  @Column({ nullable: true })
  interViewTime: string;
  @Column({ nullable: true })
  selectedwMessages: string;
  @Column({ nullable: true })
  remarks: string;
  @Column({ default: true })
  activeStatus: boolean;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "int", nullable: true })
  updated_by: number;
  @Column({ type: "timestamp", nullable: true })
  updated_at: Date;
  @ManyToOne(() => Resume, (resum) => resum.jobCan, { nullable: true })
  @JoinColumn({ name: "resume_id" })
  resume: Resume;
}
