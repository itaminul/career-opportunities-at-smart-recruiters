import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSelectedResuemModifyResumeTable1745213012805 implements MigrationInterface {
    name = 'CreateSelectedResuemModifyResumeTable1745213012805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "selectedresume" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying, "phone" character varying, "email" character varying, "mobile" character varying, "city" character varying, "district" character varying, "division" character varying, "dateOfBirth" character varying, "currentSalary" integer, "expectedSalary" integer, "noticePeriod" character varying, "Interviewer" character varying, "interviewStage" integer NOT NULL DEFAULT '1', "interviewScheduledDate" TIMESTAMP, "interviewScheduledTime" character varying, "interviewAddress" character varying, "age" integer, "messagesForInterviwer" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, "remarksInterviewStatuge" character varying, CONSTRAINT "PK_199d3885f37f8551dd4d86424e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "positionName" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "resumeLink" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "linkedInProfileLink" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "githubLink" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "websiteLink" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "currentJobTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "currentCompanyName" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "education" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "certifications" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "languages" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "reference" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "jobPossition" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "experience" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "projects" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "hobies" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "programming" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "skillsTechnologies" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "nameOfCV" character varying`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "dateOfBirth"`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "dateOfBirth" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "dateOfBirth"`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "dateOfBirth" date`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "nameOfCV"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "skillsTechnologies"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "programming"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "hobies"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "projects"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "jobPossition"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "reference"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "languages"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "certifications"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "education"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "currentCompanyName"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "currentJobTitle"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "websiteLink"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "githubLink"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "linkedInProfileLink"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "resumeLink"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "positionName"`);
        await queryRunner.query(`DROP TABLE "selectedresume"`);
    }

}
