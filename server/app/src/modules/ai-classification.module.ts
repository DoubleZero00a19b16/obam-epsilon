import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiClassification } from '@/entities/ai-classification.entity';
import { Rating } from '@/entities/rating.entity';
import { AiClassificationService } from '@/services/ai-classification.service';
import { AiClassificationController } from '@/controllers/ai-classification.controller';
import { RatingsModule } from './ratings.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiClassification, Rating]),
    forwardRef(() => RatingsModule),
    HttpModule
  ],
  controllers: [AiClassificationController],
  providers: [AiClassificationService],
  exports: [AiClassificationService],
})
export class AiClassificationModule {}