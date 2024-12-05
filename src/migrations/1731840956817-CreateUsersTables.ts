import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTables1731840956817 implements MigrationInterface {
    name = 'CreateUsersTables1731840956817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "roleName" character varying NOT NULL, "activeStatus" boolean NOT NULL DEFAULT true, "orgId" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "filename" character varying NOT NULL, "views" integer NOT NULL, "isPublished" boolean NOT NULL, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resume_attachments" ("id" SERIAL NOT NULL, "attachmentFile" character varying NOT NULL, "attachmentType" character varying NOT NULL, "attachmentPath" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, "resume_id" integer NOT NULL, CONSTRAINT "PK_cdbd4096b440e069be21c4b7b0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resume" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "mobile" character varying NOT NULL, "experience" character varying NOT NULL, "present_salary" character varying NOT NULL, "expected_salary" character varying NOT NULL, "city" character varying NOT NULL, "district" character varying NOT NULL, "division" character varying NOT NULL, "dateOfBirth" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "updated_at" TIMESTAMP, CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resume_attachments" ADD CONSTRAINT "FK_486d559bdf0175e69d43d1d2dd3" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume_attachments" DROP CONSTRAINT "FK_486d559bdf0175e69d43d1d2dd3"`);
        await queryRunner.query(`DROP TABLE "resume"`);
        await queryRunner.query(`DROP TABLE "resume_attachments"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
