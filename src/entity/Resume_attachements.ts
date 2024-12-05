import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resume } from './Resume';
@Entity()
export class Resume_attachments {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  attachmentFile: string;
  @Column()
  attachmentType: string;
  @Column()
  attachmentPath: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ type: 'int', nullable: true })
  updated_by: number;
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @ManyToOne(() => Resume, (resume) => resume.attachments, { nullable: false })
  @JoinColumn({ name: 'resume_id' })
  resume: Resume;
}
