import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
import { Market } from './stores.entity';

@Entity('orders')
@Index('idx_user_created', ['userId', 'createdAt'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_order_user')
  @Column({ type: 'varchar', length: '36' })
  userId: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'Bonus card number used for this purchase'
  })
  bonusCardNumber: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Total order amount in dollars'
  })
  totalAmount: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.00,
    comment: 'Bonus earned from this purchase (standard cashback)'
  })
  bonusEarned: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Index('idx_order_market')
  @Column({ type: 'uuid' }) // Matches Market.id type
  marketId: string;

  // Relation
  @ManyToOne(() => Market, (market) => market.orders)
  @JoinColumn({ name: 'marketId' })
  market: Market;
}