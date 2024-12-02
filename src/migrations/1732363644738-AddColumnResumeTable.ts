import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnResumeTable1732363644738 implements MigrationInterface {
    name = 'AddColumnResumeTable1732363644738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ADD "interviewMessages" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "interViewDate" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "interViewTime" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "selectedwMessages" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "remarks" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "activeStatus" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "activeStatus" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "remarks"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "selectedwMessages"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "interViewTime"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "interViewDate"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "interviewMessages"`);
    }

}
