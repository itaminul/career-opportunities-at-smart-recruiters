import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyResumeResumeAttachTables1731925868747 implements MigrationInterface {
    name = 'ModifyResumeResumeAttachTables1731925868747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume_attachments" ALTER COLUMN "attachmentFile" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ALTER COLUMN "attachmentType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ALTER COLUMN "attachmentPath" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "mobile" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "experience" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "present_salary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "expected_salary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "district" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "division" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "dateOfBirth" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "dateOfBirth" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "division" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "district" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "expected_salary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "present_salary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "experience" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "mobile" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ALTER COLUMN "attachmentPath" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ALTER COLUMN "attachmentType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ALTER COLUMN "attachmentFile" SET NOT NULL`);
    }

}
