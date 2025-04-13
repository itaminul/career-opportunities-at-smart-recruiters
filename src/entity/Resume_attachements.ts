import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resume } from './resume';


@Entity('resume_attachments')
export class Resume_attachments {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true})
  attachmentFile: string;
  @Column({ nullable: true})
  attachmentType: string;
  @Column({ nullable: true})
  attachmentPath: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ type: 'int', nullable: true })
  updated_by: number;
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @ManyToOne(() => Resume, (resume) => resume.resumeAttachments, { nullable: true })
  @JoinColumn({ name: 'resume_id' }) // Specify foreign key column name here
  resume: Resume;
}
