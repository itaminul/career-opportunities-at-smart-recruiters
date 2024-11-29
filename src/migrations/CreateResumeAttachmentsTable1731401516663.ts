import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResumeAttachmentsTable1631401516664 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Creating the 'resume_attachments' table
        await queryRunner.query(`
            CREATE TABLE resume_attachments (
                id SERIAL PRIMARY KEY,
                attachmentFile VARCHAR(255) NOT NULL,
                attachmentType VARCHAR(255) NOT NULL,
                attachmentPath VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_by INT NULL,
                updated_at TIMESTAMP NULL,
                resume_id INT,
                FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Dropping the 'resume_attachments' table
        await queryRunner.query('DROP TABLE IF EXISTS resume_attachments');
    }
}
