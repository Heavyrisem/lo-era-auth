import { MigrationInterface, QueryRunner } from "typeorm";

export class GoogleAuth1662739352186 implements MigrationInterface {
    name = 'GoogleAuth1662739352186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`providerId\` \`providerId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`providerId\` \`providerId\` varchar(255) NOT NULL`);
    }

}
