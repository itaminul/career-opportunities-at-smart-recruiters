import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resume_attachments } from './Resume_attachements';
@Entity()
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
  experience: string;

  @Column()
  present_salary: string;

  @Column()
  expected_salary: string;
  @Column()
  city: string;
  @Column()
  district: string;
  @Column()
  division: string;
  @Column()
  dateOfBirth: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ type: 'int', nullable: true })
  updated_by: number;
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @OneToMany(
    () => Resume_attachments,
    (resumeAttachment) => resumeAttachment.resume,
  )
  attachments: Resume_attachments[];
}
