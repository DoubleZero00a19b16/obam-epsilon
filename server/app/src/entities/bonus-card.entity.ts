import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, Index, BeforeInsert } from 'typeorm';
import { User } from './user.entity';

@Entity('bonus_cards')
export class BonusCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_bonus_card_number', { unique: true })
  @Column({ type: 'varchar', length: 50, unique: true })
  cardNumber: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ 
    type: 'boolean', 
    default: true,
    comment: 'Whether the card is active'
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => User, user => user.bonusCard)
  @JoinColumn({ name: 'userId' })
  user: User;

  @BeforeInsert()
  generateCardNumber() {
    const now = new Date();
    const year = now.getFullYear();
    
    // Generate a random 4-digit suffix to ensure uniqueness 
    // even if two users join at the exact same millisecond
    const random = Math.floor(1000 + Math.random() * 9000);
    
    // Generate a timestamp string (e.g., month + day + hour + minute)
    const timePart = now.getTime().toString().slice(-6); 

    // Result: BC-2026-826123
    this.cardNumber = `BC-${year}-${timePart}${random}`.slice(0, 20);
  }
}
