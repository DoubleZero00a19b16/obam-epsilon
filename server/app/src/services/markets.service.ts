import { CreateMarketDto } from '@/dtos/create-market.dto';
import { UpdateMarketDto } from '@/dtos/update-market.dto';
import { Market } from '@/entities/stores.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(Market)
    private marketRepo: Repository<Market>
  ) {}

  create(createMarketDto: CreateMarketDto) {
    return 'This action adds a new market';
  }

  async findAll() {
    const markets: Market[] = await this.marketRepo.find();
    return markets;
  }

  findOne(id: number) {
    return `This action returns a #${id} market`;
  }

  update(id: number, updateMarketDto: UpdateMarketDto) {
    return `This action updates a #${id} market`;
  }

  remove(id: number) {
    return `This action removes a #${id} market`;
  }
}
