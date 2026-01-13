import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { Rating } from './rating.entity';

@Entity('ai_classifications')
@Index('IDX_AI_CLASSIFICATION_RATING', ['ratingId'])
@Index(['topicLabel'])
export class AiClassification {
  @PrimaryGeneratedColumn('increment')
  classificationId: number;

  @Column({ type: 'uuid' })
  @Index()
  ratingId: string;

  @ManyToOne(() => Rating, rating => rating.aiClassifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ratingId' })
  rating: Rating;

  @Column({ type: 'varchar', length: 100 })
  topicLabel: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  topicConfidence: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}