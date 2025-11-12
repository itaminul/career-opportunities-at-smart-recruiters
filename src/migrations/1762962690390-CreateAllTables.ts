import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTables1762962690390 implements MigrationInterface {
    name = 'CreateAllTables1762962690390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "filename" character varying NOT NULL, "views" integer NOT NULL, "isPublished" boolean NOT NULL, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resume_attachments" ("id" SERIAL NOT NULL, "attachmentFile" character varying, "attachmentType" character varying, "attachmentPath" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, "resume_id" integer, CONSTRAINT "PK_cdbd4096b440e069be21c4b7b0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_candidate" ("id" SERIAL NOT NULL, "candidateStatus" integer NOT NULL, "interviewMessages" character varying, "interViewDate" character varying, "interViewTime" character varying, "selectedwMessages" character varying, "remarks" character varying, "activeStatus" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, "resume_id" integer, CONSTRAINT "PK_494a377adeb6aa9b0404b899cb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "selectedresume" ("id" SERIAL NOT NULL, "resumeId" integer, "name" character varying, "address" character varying, "phone" character varying, "email" character varying, "mobile" character varying, "city" character varying, "district" character varying, "division" character varying, "dateOfBirth" character varying, "currentSalary" integer, "expectedSalary" integer, "noticePeriod" character varying, "Interviewer" character varying, "interviewStage" integer NOT NULL DEFAULT '1', "interviewScheduledDate" TIMESTAMP, "interviewScheduledTime" character varying, "interviewAddress" character varying, "age" integer, "messagesForInterviwer" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, "remarksInterviewStatuge" character varying, "activeStatus" character varying NOT NULL DEFAULT true, CONSTRAINT "PK_199d3885f37f8551dd4d86424e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resume" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying, "phone" character varying, "email" character varying, "mobile" character varying, "city" character varying, "district" character varying, "division" character varying, "dateOfBirth" character varying, "currentSalary" integer, "expectedSalary" integer, "noticePeriod" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, "positionName" character varying, "resumeLink" character varying, "linkedInProfileLink" character varying, "githubLink" character varying, "websiteLink" character varying, "currentJobTitle" character varying, "currentCompanyName" character varying, "education" character varying, "certifications" character varying, "languages" character varying, "reference" character varying, "jobPossition" character varying, "experience" character varying, "projects" character varying, "hobies" character varying, "programming" character varying, "skillsTechnologies" character varying, "nameOfCV" character varying, "applicationCurretStatus" integer NOT NULL DEFAULT '0', "username" character varying NOT NULL, "password" character varying NOT NULL, "roleName" character varying NOT NULL DEFAULT 'candidate', "activeStatus" boolean NOT NULL DEFAULT true, "orgId" integer NOT NULL DEFAULT '1', CONSTRAINT "UQ_84411b2af152c8d5decbded75d7" UNIQUE ("username"), CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ADD CONSTRAINT "FK_486d559bdf0175e69d43d1d2dd3" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_candidate" ADD CONSTRAINT "FK_0e8a4220f51aa7a9eb2b75f0498" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_candidate" DROP CONSTRAINT "FK_0e8a4220f51aa7a9eb2b75f0498"`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" DROP CONSTRAINT "FK_486d559bdf0175e69d43d1d2dd3"`);
        await queryRunner.query(`DROP TABLE "resume"`);
        await queryRunner.query(`DROP TABLE "selectedresume"`);
        await queryRunner.query(`DROP TABLE "job_candidate"`);
        await queryRunner.query(`DROP TABLE "resume_attachments"`);
        await queryRunner.query(`DROP TABLE "photo"`);
    }

}
