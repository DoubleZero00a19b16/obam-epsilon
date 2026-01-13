import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RatingsModule } from './modules/ratings.module';
import { OrdersModule } from './modules/orders.module';

// Import all entities
import { User } from './entities/user.entity';
import { BonusCard } from './entities/bonus-card.entity';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Rating } from './entities/rating.entity';
import { RewardTransaction } from './entities/reward-transaction.entity';
import { ClsModule } from 'nestjs-cls';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { ProductCredit } from './entities/product-credit.entity';
import { Market } from './entities/stores.entity';
import { AiClassificationModule } from './modules/ai-classification.module';
import { AiClassification } from './entities/ai-classification.entity';
import { ProductsModule } from './modules/products.module';
import { MarketsModule } from './modules/markets.module';

@Module({
  imports: [
    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ClsModule.forRoot({
      global: true,
      middleware: { mount: true }
    }),

    // Database configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_DATABASE', 'bonus_card_rating'),
        entities: [
          User,
          BonusCard,
          Product,
          Order,
          OrderItem,
          Rating,
          RewardTransaction,
          ProductCredit,
          Market,
          AiClassification
        ],
        synchronize: configService.get('DB_SYNCHRONIZE', false), // Set to false in production
        logging: configService.get('DB_LOGGING', false),
        timezone: 'Z', // Use UTC
      }),
      inject: [ConfigService],
    }),

    // Feature modules
    RatingsModule,
    OrdersModule,
    UsersModule,
    AuthModule,
    AiClassificationModule,
    ProductsModule,
    MarketsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
