import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketsService } from '../services/markets.service';
import { CreateMarketDto } from '@/dtos/create-market.dto';
import { UpdateMarketDto } from '@/dtos/update-market.dto';

@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @Post()
  create(@Body() createMarketDto: CreateMarketDto) {
    return this.marketsService.create(createMarketDto);
  }

  @Get()
  findAll() {
    return this.marketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketDto: UpdateMarketDto) {
    return this.marketsService.update(+id, updateMarketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketsService.remove(+id);
  }
}
