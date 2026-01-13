import { Module } from '@nestjs/common';
import { ProductsController } from '../controllers/products.controller';
import { ProductsService } from '@/services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@/entities/product.entity';
import { Rating } from '@/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Rating])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
