import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, BeforeInsert } from 'typeorm';
import { BonusCard } from './bonus-card.entity';
import { Order } from './order.entity';
import { Rating } from './rating.entity';
import { RewardTransaction } from './reward-transaction.entity';
import * as bcyrpt from 'bcrypt'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  surname: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  phone: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    default: 0.00,
    comment: 'Bonus balance in dollars'
  })
  bonusBalance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => BonusCard, bonusCard => bonusCard.user)
  bonusCard: BonusCard;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[];

  @OneToMany(() => RewardTransaction, transaction => transaction.user)
  rewardTransactions: RewardTransaction[];

  @BeforeInsert()
  async hashPassword() {
    const salt = 10;
    const password = this.password;
    const hash = await bcyrpt.hash(password, salt);
    this.password = hash;
  }
}
