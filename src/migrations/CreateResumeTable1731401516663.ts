import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResumeTable1631401516663 implements MigrationInterface {

    // This method will be called when the migration is applied
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Creating the 'resume' table
        await queryRunner.query(`
            CREATE TABLE resume (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                phone VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                mobile VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                district VARCHAR(255) NOT NULL,
                division VARCHAR(255) NOT NULL,
                dateOfBirth VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_by INT NULL,
                updated_at TIMESTAMP NULL
            );
        `);
    }

   
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS resume');
    }
}
