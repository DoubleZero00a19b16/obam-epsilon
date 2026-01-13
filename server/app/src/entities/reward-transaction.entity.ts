import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { Rating } from './rating.entity';

export enum TransactionType {
  RATING_REWARD = 'rating_reward',
  PURCHASE_CASHBACK = 'purchase_cashback',
  MANUAL_ADJUSTMENT = 'manual_adjustment'
}

@Entity('reward_transactions')
@Index('idx_user_created', ['userId', 'createdAt'])
export class RewardTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_transaction_user')
  @Column({ type: 'uuid' })
  userId: string;

  @Column({ 
    type: 'uuid',
    nullable: true,
    comment: 'Reference to rating if this is a rating reward'
  })
  ratingId: string | null;

  @Column({ 
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.RATING_REWARD
  })
  type: TransactionType;

  @Column({ 
    type: 'int',
    unsigned: true,
    comment: 'Points earned in this transaction'
  })
  points: number;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2,
    comment: 'Bonus amount in dollars'
  })
  amount: number;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2,
    comment: 'User balance after this transaction'
  })
  balanceAfter: number;

  @Column({ 
    type: 'varchar',
    length: 500,
    nullable: true,
    comment: 'Additional description or notes'
  })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.rewardTransactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Rating, { nullable: true })
  @JoinColumn({ name: 'ratingId' })
  rating: Rating | null;
}
