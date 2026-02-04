import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationsController } from '@/controllers/recommendations.controller';
import { RecommendationsService } from '@/services/recommendations.service';
import { Recommendation } from '@/entities/recommendation.entity';
import { Product } from '@/entities/product.entity';
import { Market } from '@/entities/stores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recommendation, Product, Market])],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
