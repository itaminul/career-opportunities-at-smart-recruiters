import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyResumeResumeAttachTables1731927712677 implements MigrationInterface {
    name = 'ModifyResumeResumeAttachTables1731927712677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ADD "notice_period" character varying`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" DROP CONSTRAINT "FK_486d559bdf0175e69d43d1d2dd3"`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ALTER COLUMN "resume_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ADD CONSTRAINT "FK_486d559bdf0175e69d43d1d2dd3" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume_attachments" DROP CONSTRAINT "FK_486d559bdf0175e69d43d1d2dd3"`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ALTER COLUMN "resume_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ADD CONSTRAINT "FK_486d559bdf0175e69d43d1d2dd3" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "notice_period"`);
    }

}
