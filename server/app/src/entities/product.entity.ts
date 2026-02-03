import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Rating } from './rating.entity';

@Entity('products')
@Index('idx_product_sorting', ['isPrivateLabel', 'ratingCount']) // Composite index for efficient sorting
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sku: string;



  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Product price in dollars'
  })
  price: number;

  @Index('idx_is_private_label')
  @Column({
    type: 'boolean',
    default: false,
    name: 'is_private_label',
    comment: 'True if this is a Private Label (PL) product'
  })
  isPrivateLabel: boolean;

  @Index('idx_rating_count')
  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
    name: 'rating_count',
    comment: 'Total number of ratings received'
  })
  ratingCount: number;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0.00,

    name: 'average_rating',
    comment: 'Average rating score (1.00 to 5.00)'
  })
  averageRating: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.00,
    name: 'reward_amount',
    comment: 'Static reward amount in dollars for rating this product'
  })
  rewardAmount: number;

  @Column({
    type: 'boolean',
    default: true,
    name: 'is_active',
    comment: 'Whether the product is active in the catalog'
  })
  isActive: boolean;

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_new',
    comment: 'Whether the product is marked as new'
  })
  isNew: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => Rating, rating => rating.product)
  ratings: Rating[];
}
