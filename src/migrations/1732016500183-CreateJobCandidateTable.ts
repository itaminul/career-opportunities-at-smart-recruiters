import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJobCandidateTable1732016500183 implements MigrationInterface {
    name = 'CreateJobCandidateTable1732016500183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "job_candidate" ("id" SERIAL NOT NULL, "candidateStatus" integer NOT NULL, "interviewMessages" character varying, "interViewDate" character varying, "interViewTime" character varying, "selectedwMessages" character varying, "remarks" character varying, "activeStatus" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, "resume_id" integer, CONSTRAINT "PK_494a377adeb6aa9b0404b899cb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "resumeStatus" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "activeStatus" boolean NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "job_candidate" ADD CONSTRAINT "FK_0e8a4220f51aa7a9eb2b75f0498" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_candidate" DROP CONSTRAINT "FK_0e8a4220f51aa7a9eb2b75f0498"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "activeStatus"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "resumeStatus"`);
        await queryRunner.query(`DROP TABLE "job_candidate"`);
    }

}
