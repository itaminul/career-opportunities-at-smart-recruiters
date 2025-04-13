import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResumeAttachementJobCategoryTables1744532197410 implements MigrationInterface {
    name = 'CreateResumeAttachementJobCategoryTables1744532197410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resume_attachments" ("id" SERIAL NOT NULL, "attachmentFile" character varying, "attachmentType" character varying, "attachmentPath" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, "resume_id" integer, CONSTRAINT "PK_cdbd4096b440e069be21c4b7b0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_candidate" ("id" SERIAL NOT NULL, "candidateStatus" integer NOT NULL, "interviewMessages" character varying, "interViewDate" character varying, "interViewTime" character varying, "selectedwMessages" character varying, "remarks" character varying, "activeStatus" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, "resume_id" integer, CONSTRAINT "PK_494a377adeb6aa9b0404b899cb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resume" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "mobile" character varying NOT NULL, "city" character varying NOT NULL, "district" character varying NOT NULL, "division" character varying NOT NULL, "dateOfBirth" character varying NOT NULL, "currentSalary" integer NOT NULL, "expectedSalary" integer NOT NULL, "noticePeriod" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ADD CONSTRAINT "FK_486d559bdf0175e69d43d1d2dd3" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_candidate" ADD CONSTRAINT "FK_0e8a4220f51aa7a9eb2b75f0498" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_candidate" DROP CONSTRAINT "FK_0e8a4220f51aa7a9eb2b75f0498"`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" DROP CONSTRAINT "FK_486d559bdf0175e69d43d1d2dd3"`);
        await queryRunner.query(`DROP TABLE "resume"`);
        await queryRunner.query(`DROP TABLE "job_candidate"`);
        await queryRunner.query(`DROP TABLE "resume_attachments"`);
    }

}
