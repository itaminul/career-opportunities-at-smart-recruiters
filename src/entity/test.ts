import { Column, PrimaryGeneratedColumn } from "typeorm";

export class TestCheck {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "int", nullable: true })
  updated_by: number;
  @Column({ type: "datetime", nullable: true })
  updated_at: Date;
}
