import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnResumeTable1745304514487 implements MigrationInterface {
    name = 'AddColumnResumeTable1745304514487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "passWord"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "rolename"`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "roleName" character varying NOT NULL DEFAULT 'candidate'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "roleName"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "rolename" character varying NOT NULL DEFAULT 'candidate'`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "passWord" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "userName" character varying NOT NULL`);
    }

}
