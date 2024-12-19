import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resume_attachments } from "./resume_attachments";

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
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "int", nullable: true })
  updated_by: number;
  @Column({ type: "datetime", nullable: true })
  updated_at: Date;

  @OneToMany(() => Resume_attachments, (attachment) => attachment.resume)
  attachments: Resume_attachments[]
}
