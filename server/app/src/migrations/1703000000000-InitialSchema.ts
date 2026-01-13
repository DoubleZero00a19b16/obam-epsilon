import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class InitialSchema1703000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'bonusBalance',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0.00,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Create bonus_cards table
    await queryRunner.createTable(
      new Table({
        name: 'bonus_cards',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'cardNumber',
            type: 'varchar',
            length: '50',
            isUnique: true,
          },
          {
            name: 'userId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'bonus_cards',
      new TableIndex({
        name: 'idx_bonus_card_number',
        columnNames: ['cardNumber'],
        isUnique: true,
      }),
    );

    await queryRunner.createForeignKey(
      'bonus_cards',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    // Create products table
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'sku',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'is_private_label',
            type: 'boolean',
            default: false,
          },
          {
            name: 'rating_count',
            type: 'int',
            unsigned: true,
            default: 0,
          },
          {
            name: 'average_rating',
            type: 'decimal',
            precision: 3,
            scale: 2,
            default: 0.00,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Create composite index for efficient product sorting
    await queryRunner.createIndex(
      'products',
      new TableIndex({
        name: 'idx_product_sorting',
        columnNames: ['is_private_label', 'rating_count'],
      }),
    );

    await queryRunner.createIndex(
      'products',
      new TableIndex({
        name: 'idx_is_private_label',
        columnNames: ['is_private_label'],
      }),
    );

    await queryRunner.createIndex(
      'products',
      new TableIndex({
        name: 'idx_rating_count',
        columnNames: ['rating_count'],
      }),
    );

    // Create orders table
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'bonusCardNumber',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'completed', 'cancelled', 'refunded'],
            default: "'pending'",
          },
          {
            name: 'totalAmount',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'bonusEarned',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0.00,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'orders',
      new TableIndex({
        name: 'idx_order_user',
        columnNames: ['userId'],
      }),
    );

    await queryRunner.createIndex(
      'orders',
      new TableIndex({
        name: 'idx_user_created',
        columnNames: ['userId', 'createdAt'],
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    // Create order_items table
    await queryRunner.createTable(
      new Table({
        name: 'order_items',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'orderId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'productId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'quantity',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'unitPrice',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'totalPrice',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'order_items',
      new TableIndex({
        name: 'idx_order_item_order',
        columnNames: ['orderId'],
      }),
    );

    await queryRunner.createIndex(
      'order_items',
      new TableIndex({
        name: 'idx_order_item_product',
        columnNames: ['productId'],
      }),
    );

    await queryRunner.createIndex(
      'order_items',
      new TableIndex({
        name: 'idx_order_product',
        columnNames: ['orderId', 'productId'],
      }),
    );

    await queryRunner.createForeignKey(
      'order_items',
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'order_items',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'RESTRICT',
      }),
    );

    // Create ratings table
    await queryRunner.createTable(
      new Table({
        name: 'ratings',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'productId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'score',
            type: 'tinyint',
            unsigned: true,
          },
          {
            name: 'comment',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'rewardPoints',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'rewardAmount',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'ratings',
      new TableIndex({
        name: 'idx_user_product_unique',
        columnNames: ['userId', 'productId'],
        isUnique: true,
      }),
    );

    await queryRunner.createIndex(
      'ratings',
      new TableIndex({
        name: 'idx_rating_user',
        columnNames: ['userId'],
      }),
    );

    await queryRunner.createIndex(
      'ratings',
      new TableIndex({
        name: 'idx_rating_product',
        columnNames: ['productId'],
      }),
    );

    await queryRunner.createIndex(
      'ratings',
      new TableIndex({
        name: 'idx_product_ratings',
        columnNames: ['productId', 'createdAt'],
      }),
    );

    await queryRunner.createForeignKey(
      'ratings',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'ratings',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );

    // Create reward_transactions table
    await queryRunner.createTable(
      new Table({
        name: 'reward_transactions',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'ratingId',
            type: 'varchar',
            length: '36',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['rating_reward', 'purchase_cashback', 'manual_adjustment'],
            default: "'rating_reward'",
          },
          {
            name: 'points',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'balanceAfter',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'reward_transactions',
      new TableIndex({
        name: 'idx_transaction_user',
        columnNames: ['userId'],
      }),
    );

    await queryRunner.createIndex(
      'reward_transactions',
      new TableIndex({
        name: 'idx_user_created',
        columnNames: ['userId', 'createdAt'],
      }),
    );

    await queryRunner.createForeignKey(
      'reward_transactions',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'reward_transactions',
      new TableForeignKey({
        columnNames: ['ratingId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ratings',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.dropTable('reward_transactions');
    await queryRunner.dropTable('ratings');
    await queryRunner.dropTable('order_items');
    await queryRunner.dropTable('orders');
    await queryRunner.dropTable('products');
    await queryRunner.dropTable('bonus_cards');
    await queryRunner.dropTable('users');
  }
}
