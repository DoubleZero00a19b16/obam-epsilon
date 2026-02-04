import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Market } from './stores.entity';

export enum RecommendationActionType {
  TRANSFER_STOCK = 'TRANSFER_STOCK',
  INCREASE_PRICE = 'INCREASE_PRICE',
  DECREASE_PRICE = 'DECREASE_PRICE',
  STOP_RESTOCK = 'STOP_RESTOCK',
  START_RESTOCK = 'START_RESTOCK',
  PROMOTE_PRODUCT = 'PROMOTE_PRODUCT',
  DISCOUNT_PRODUCT = 'DISCOUNT_PRODUCT',
}

export enum RecommendationStatus {
  ACTIVE = 'active',
  EXECUTED = 'executed',
  STOPPED = 'stopped',
}

@Entity('recommendations')
@Index('idx_recommendation_product', ['productId'])
@Index('idx_recommendation_market', ['marketId'])
@Index('idx_recommendation_status', ['status'])
@Index('idx_recommendation_created', ['createdAt'])
export class Recommendation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'uuid' })
  marketId: string;

  @Column({
    type: 'enum',
    enum: RecommendationActionType,
  })
  actionType: RecommendationActionType;

  @Column({ type: 'json', nullable: true })
  actionPayload?: Record<string, any>;

  @Column({
    type: 'enum',
    enum: RecommendationStatus,
    default: RecommendationStatus.ACTIVE,
  })
  status: RecommendationStatus;

  @Column({ type: 'text', nullable: true })
  reason?: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  confidenceScore?: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  lastEvaluatedAt?: Date;

  @Column({ type: 'uuid', nullable: true })
  approvedBy?: string;

  @Column({ type: 'datetime', nullable: true })
  approvedAt?: Date;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Market, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'marketId' })
  market: Market;
}
