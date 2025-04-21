import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnResumeTable1745235067097 implements MigrationInterface {
    name = 'AddColumnResumeTable1745235067097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "selectedresume" ADD "resumeId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "selectedresume" DROP COLUMN "resumeId"`);
    }

}
