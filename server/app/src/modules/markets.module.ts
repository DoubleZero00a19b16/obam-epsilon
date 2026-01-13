import { Module } from '@nestjs/common';
import { MarketsService } from '../services/markets.service';
import { MarketsController } from '../controllers/markets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from '@/entities/stores.entity';

@Module({
  controllers: [MarketsController],
  providers: [MarketsService],
  imports: [
    TypeOrmModule.forFeature([Market])
  ]
})
export class MarketsModule {}
