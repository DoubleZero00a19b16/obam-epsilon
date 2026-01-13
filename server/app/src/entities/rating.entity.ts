import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { RewardTransaction } from './reward-transaction.entity';
import { AiClassification } from './ai-classification.entity';

@Entity('ratings')
@Index(['userId', 'productId'], { unique: true })
@Index(['productId'])
@Index(['userId'])
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, user => user.ratings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  productId: string;

  @ManyToOne(() => Product, product => product.ratings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relationships
  @OneToMany(() => RewardTransaction, transaction => transaction.rating)
  rewardTransactions: RewardTransaction[];

  @Column({ 
    type: 'int',
    unsigned: true,
    comment: 'Reward points earned for this rating (10 or 30)'
  })
  rewardPoints: number;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2,
    comment: 'Bonus money earned for this rating (in dollars)'
  })
  rewardAmount: number;

  @OneToMany(() => AiClassification, classification => classification.rating, {
    cascade: true,
  })
  aiClassifications: AiClassification[];
}