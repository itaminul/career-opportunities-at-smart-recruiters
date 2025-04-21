import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resume } from "./resume";

@Entity("selectedresume")
export class SelectedResume {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  resumeId: number;
  @Column({nullable: true})
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

  @Column({ nullable: true })
  Interviewer: string;

  // Explanation:1 application view, 2 application selected 3 call for first interview 4 for second interview 5 for third interview 6 for final interview 7 for selected
  @Column({ nullable: false, default: 1 })
  interviewStage: number;

  @Column({ nullable: true, type: Date })
  interviewScheduledDate: Date;

  @Column({ nullable: true })
  interviewScheduledTime: string;

  @Column({ nullable: true })
  interviewAddress: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  messagesForInterviwer: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "int", nullable: true })
  updated_by: number;
  @Column({ type: "timestamp", nullable: true })
  updated_at: Date;

  @ManyToMany(() => Resume, (resum) => resum.selectedresume, {
    nullable: true,
  })
  selectedresume: Resume[];

  // Remarks column to store interview stages
  @Column({ nullable: true })
  remarksInterviewStatuge: string;
  // Method to set remarks based on interview stage
  setRemarks() {
    const stageMap: { [key: number]: string } = {
      1: "Application View",
      2: "Applicaton selected",
      3: "First Interview",
      4: "Second Interview",
      5: "Third Interview",
      6: "Forth Interview",
      7: "Final Interview",
      8: "Selected",
    };

    // Assign the corresponding remarks based on interviewStage
    this.remarksInterviewStatuge =
      stageMap[this.interviewStage] || "Unknown Stage";
  }
}
