import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPokemons1620323627119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Pokemons',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'generation',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'active',
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'type_id',
                        type: 'integer'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKType',
                        referencedTableName: 'Types',
                        referencedColumnNames: ['id'],
                        columnNames: ['type_id'],
                        onDelete: 'cascade',
                        onUpdate: 'cascade'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Pokemons')
    }

}
