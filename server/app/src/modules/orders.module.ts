import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from '../controllers/orders.controller';
import { OrdersService } from '../services/orders.service';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Rating } from '../entities/rating.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { BonusCard } from '../entities/bonus-card.entity';
import { ProductCredit } from '@/entities/product-credit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      Rating,
      Product,
      User,
      BonusCard,
      ProductCredit
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}