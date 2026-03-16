import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClientFields1773700000000 implements MigrationInterface {
  name = "AddClientFields1773700000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD \`status\` enum('ativo','inativo') NOT NULL DEFAULT 'ativo'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD \`cep\` varchar(9) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD \`street\` varchar(200) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD \`number\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD \`complement\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD \`neighborhood\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD \`city\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD \`state\` varchar(2) NULL`,
    );
    // Normalize phone column length
    await queryRunner.query(
      `ALTER TABLE \`clients\` MODIFY \`phone\` varchar(20) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`state\``);
    await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`city\``);
    await queryRunner.query(
      `ALTER TABLE \`clients\` DROP COLUMN \`neighborhood\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` DROP COLUMN \`complement\``,
    );
    await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`number\``);
    await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`street\``);
    await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`cep\``);
    await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`status\``);
  }
}
