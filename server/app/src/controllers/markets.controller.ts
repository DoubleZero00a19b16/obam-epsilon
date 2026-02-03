import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MarketsService } from '../services/markets.service';
import { CreateMarketDto } from '@/dtos/create-market.dto';
import { UpdateMarketDto } from '@/dtos/update-market.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/auth.guard';
import { AdminGuard } from '@/guards/admin.guard';
import { PaginationParamsDto } from '@/dtos/pagination.dto';

@Controller('markets')
@ApiTags('Markets')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, AdminGuard)
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) { }

  @Post()
  create(@Body() createMarketDto: CreateMarketDto) {
    return this.marketsService.create(createMarketDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all markets with pagination' })
  findAll(@Query() query: PaginationParamsDto) {
    return this.marketsService.findAll(query);
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
