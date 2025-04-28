import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnSelectedResumeTable1745658605551 implements MigrationInterface {
    name = 'AddColumnSelectedResumeTable1745658605551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "selectedresume" ADD "activeStatus" character varying NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "selectedresume" DROP COLUMN "activeStatus"`);
    }

}
