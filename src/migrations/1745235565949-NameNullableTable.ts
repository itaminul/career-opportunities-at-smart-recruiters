import { MigrationInterface, QueryRunner } from "typeorm";

export class NameNullableTable1745235565949 implements MigrationInterface {
    name = 'NameNullableTable1745235565949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "selectedresume" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "selectedresume" ALTER COLUMN "name" SET NOT NULL`);
    }

}
