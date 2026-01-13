import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsController } from '../controllers/ratings.controller';
import { RatingsService } from '../services/ratings.service';
import { Rating } from '../entities/rating.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { OrderItem } from '../entities/order-item.entity';
import { RewardTransaction } from '../entities/reward-transaction.entity';
import { ProductCredit } from '@/entities/product-credit.entity';
import { AiClassificationModule } from './ai-classification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Rating,
      Product,
      User,
      OrderItem,
      RewardTransaction,
      ProductCredit,
    ]),
    forwardRef(() => AiClassificationModule)
  ],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [RatingsService],
})
export class RatingsModule {}
