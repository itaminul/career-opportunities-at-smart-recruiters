import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnResumeTable1745840175408 implements MigrationInterface {
  name = "AddColumnResumeTable1745840175408";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "resume" ADD "applicationCurretStatus" integer NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "selectedresume"."interviewStage" IS NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "selectedresume"."interviewStage" IS '1 application view, 2 application selected 3 call for first interview 4 for second interview 5 for third interview 6 for final interview 7 for selected'`
    );
    await queryRunner.query(
      `ALTER TABLE "resume" DROP COLUMN "applicationCurretStatus"`
    );
  }
}
