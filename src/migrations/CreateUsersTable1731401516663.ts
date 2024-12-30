import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1731401516663 implements MigrationInterface {

    // This method will run when the migration is applied
    public async up(queryRunner: QueryRunner): Promise<void> {
        // SQL query for creating the Users table
        await queryRunner.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    // This method will run when the migration is reverted
    public async down(queryRunner: QueryRunner): Promise<void> {
        // SQL query for dropping the Users table
        await queryRunner.query('DROP TABLE IF EXISTS users');
    }
}
