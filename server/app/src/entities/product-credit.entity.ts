import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity('product_credits')
@Index('idx_order_product', ['orderId', 'productId'])
export class ProductCredit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_credit_order')
  @Column({ type: 'varchar', length: '36' })
  orderId: string;

  @Index('idx_credit_product')
  @Column({ type: 'varchar', length: '36' })
  productId: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Product price in this order'
  })
  productPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Static reward amount for this product'
  })
  allocatedCredit: number;

  @Column({
    type: 'int',
    unsigned: true,
    comment: 'Points allocated for rating this product (PL=30, Normal=10)'
  })
  ratingPoints: number;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Whether this credit has been claimed by rating'
  })
  isClaimed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'productId' })
  product: Product;
}