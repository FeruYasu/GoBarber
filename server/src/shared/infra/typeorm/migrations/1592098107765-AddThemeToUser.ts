import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddThemeToUser1592098107765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'theme',
        type: 'varchar',
        default: "'dark'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'theme');
  }
}
