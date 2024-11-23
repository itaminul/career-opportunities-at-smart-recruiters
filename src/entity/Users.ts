import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  roleName: string;
  @Column({ default: true })
  activeStatus: boolean;
  @Column({ default: 1 })
  orgId: number;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "int", nullable: true })
  updated_by: number;
  @Column({ type: "datetime", nullable: true })
  updated_at: Date;
}
