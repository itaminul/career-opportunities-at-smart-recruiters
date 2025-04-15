import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyResumeTable1744717289240 implements MigrationInterface {
    name = 'ModifyResumeTable1744717289240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "mobile" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "district" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "division" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "dateOfBirth" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "currentSalary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "expectedSalary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "noticePeriod" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "noticePeriod" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "expectedSalary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "currentSalary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "dateOfBirth" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "division" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "district" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "mobile" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "address" SET NOT NULL`);
    }

}
