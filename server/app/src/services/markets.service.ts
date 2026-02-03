import { CreateMarketDto } from '@/dtos/create-market.dto';
import { UpdateMarketDto } from '@/dtos/update-market.dto';
import { Market } from '@/entities/stores.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResponseDto, PaginationParamsDto } from '@/dtos/pagination.dto';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(Market)
    private marketRepo: Repository<Market>
  ) { }

  create(createMarketDto: CreateMarketDto) {
    return 'This action adds a new market';
  }

  async findAll(params: PaginationParamsDto): Promise<PaginatedResponseDto<Market>> {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const [markets, total] = await this.marketRepo.findAndCount({
      take: limit,
      skip: skip,
      // order: { name: 'ASC' } // Markets usually sorted by name
    });

    return {
      data: markets,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
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
